import * as U from './util.ts'
import * as V from './vector.ts'
import * as P from './probfunc.ts'
const {int} = U

const { log, pow, sqrt, PI, tan, atan, min, exp } = Math

abstract class Distribution {
    abstract pdf(...args: any[]): number;
    abstract cdf(...args: any[]): number;
    inv(...args: any[]) { let [ p ] = args; U.be(p >= 0 && p <= 1) }
    median(...args: any[]) { return this.mean(args) }
    mode(...args: any[]) { return this.median(args) } // 密度最大的點 -- https://en.wikipedia.org/wiki/Mode_(statistics)
    sample(...args: any[]) {
        let p = Math.random()
        return this.inv(Object.assign({}, args, { p }))
    }
    mean(...args: any[]):number {
        throw Error(`mean() not implemented!`)
    }
    variance(...args: any[]):number {
        throw Error(`variance() not implemented!`)
    }
    sd(...args: any[]) { return sqrt(this.variance(args)) }
}

export class Uniform extends Distribution {
    pdf(x:number, min: number, max: number) {
        return (x < min || x > max) ? 0 : 1 / (max - min)
    }
    cdf(q:number, min: number, max: number) {
        if (q < min) return 0
        else if (q < max) return (q - min) / (max - min)
        return 1
    }
    inv(p:number, min: number, max: number) {
        return min + (p * (max - min))
    }
    mean(min: number, max: number) {
        return 0.5 * (min + max)
    }
    variance(min: number, max: number) {
        return pow(max - min, 2) / 12;
    }
}

export class Normal extends Distribution {
    pdf(x: number, mean: number, sd: number) {
        let d = x - mean
        return 1 / (sqrt(2 * PI) * sd) * exp(-(d * d) / (2 * sd * sd))
    }
    cdf(q: number, mean: number, sd: number) {
        return 0.5 * (1 + P.erf((q - mean) / sqrt(2 * sd * sd)))
    }
    inv(p: number, mean: number, sd: number) {
        return -1.41421356237309505 * sd * P.erfcinv(2 * p) + mean
    }
    mean(mean: number, sd: number) {
        return mean
    }
    variance(mean: number, sd: number) {
        return sd * sd
    }
}

export class Exponential extends Distribution {
    pdf(x: number, rate: number) {
        return (x < 0) ? 0 : rate * exp(-rate * x)
    }
    cdf(q: number, rate: number) {
        return (q < 0) ? 0 : 1 - exp(-rate * q)
    }
    inv(p: number, rate: number) {
        return -log(1 - p) / rate
    }
    mean(rate: number) {
        return 1 / rate
    }
    medium(rate: number) {
        return (1 / rate) * log(2)
    }
    variance(rate: number) {
        return 1 / (rate * rate)
    }
}

export class Beta extends Distribution {
    pdf(x: number, shape1: number, shape2: number) {
        if (x > 1 || x < 0) return 0 // PDF is zero outside the support
        if (shape1 == 1 && shape2 == 1) return 1 // PDF is one for the uniform case
        if (shape1 < 512 && shape2 < 512) {
            return (pow(x, shape1 - 1) * pow(1 - x, shape2 - 1)) / P.betafn(shape1, shape2)
        } else {
            return exp((shape1 - 1) * log(x) +
                (shape2 - 1) * log(1 - x) -
                P.betaln(shape1, shape2))
        }
    }
    cdf(q: number, shape1: number, shape2: number) {
        return (q > 1) ? 1 :
            (q < 0) ? 0 :
                P.ibeta(q, shape1, shape2)
    }
    inv(p: number, shape1: number, shape2: number) {
        return P.ibetainv(p, shape1, shape2)
    }
    mean(shape1: number, shape2: number) {
        return shape1 / (shape1 + shape2)
    }
    median(shape1: number, shape2: number) {
        return P.ibetainv(0.5, shape1, shape2)
    }
    mode(shape1: number, shape2: number) {
        return (shape1 - 1) / (shape1 + shape2 - 2)
    }
    variance(shape1: number, shape2: number) {
        return (shape1 * shape2) / (pow(shape1 + shape2, 2) * (shape1 + shape2 + 1));
    }
}

export class F extends Distribution {
    pdf(x:number, df1:number, df2:number) {
        var p, q, f;
        if (x < 0) return 0
        if (df1 <= 2) {
            if (x === 0 && df1 < 2) return Infinity
            if (x === 0 && df1 === 2) return 1;
            return (1 / P.betafn(df1 / 2, df2 / 2)) *
                pow(df1 / df2, df1 / 2) *
                pow(x, (df1 / 2) - 1) *
                pow((1 + (df1 / df2) * x), -(df1 + df2) / 2)
        }
        p = (df1 * x) / (df2 + x * df1)
        q = df2 / (df2 + x * df1)
        f = df1 * q / 2.0
        return f * binomial.pdf((df1 - 2) / 2, (df1 + df2 - 2) / 2, p)
    }
    cdf(q:number, df1:number, df2:number) {
        if (q < 0) return 0
        return P.ibeta((df1 * q) / (df1 * q + df2), df1 / 2, df2 / 2)
    }
    inv(p:number, df1:number, df2:number) {
        return df2 / (df1 * (1 / P.ibetainv(p, df1 / 2, df2 / 2) - 1))
    }
    mean(df1:number, df2:number) {
        if (df2 > 2) return df2 / (df2 - 2)
        throw Error(`F.mean() shold be df2 > 2, but df2=${df2}`)
    }
    variance(df1:number, df2:number) {
        if (df2 <= 4) throw Error(`F.variance() shold be df2 > 4, but df2=${df2}`)
        return 2 * df2 * df2 * (df1 + df2 - 2) / (df1 * (df2 - 2) * (df2 - 2) * (df2 - 4))
    }
}

export class Cauchy extends Distribution {
    pdf(x:number, location:number, scale:number) {
        if (scale < 0) return 0
        return (scale / (pow(x - location, 2) + pow(scale, 2))) / PI
    }
    cdf(q:number, location:number, scale:number) {
        return atan((q - location) / scale) / PI + 0.5
    }
    inv(p:number, location:number, scale:number) {
        return location + scale * tan(PI * (p - 0.5));
    }
    mean(location:number, scale:number) {
        return location
    }
}

export class ChiSquare extends Distribution {
    pdf(x:number, df:number) {
        if (x < 0) return 0
        return (x === 0 && df === 2) ? 0.5 :
            exp((df / 2 - 1) * log(x) - x / 2 - (df / 2) * log(2) - P.gammaln(df / 2))
    }
    cdf(q:number, df:number) {
        if (q < 0) return 0
        return P.lowRegGamma(df / 2, q / 2)
    }
    inv(p:number, df:number) {
        return 2 * P.gammapinv(p, 0.5 * df)
    }
    mean(df:number) {
        return df
    }
    median(df:number) {
        return df * pow(1 - (2 / (9 * df)), 3)
    }
    mode(df:number) {
        return (df - 2 > 0) ? df - 2 : 0
    }
    variance(df:number) {
        return 2 * df
    }
}

export class Gamma extends Distribution {
    pdf(x:number, shape:number, scale:number) {
        if (x < 0) return 0
        return (x === 0 && shape === 1) ? 1 / scale :
            exp((shape - 1) * log(x) - x / scale - P.gammaln(shape) - shape * log(scale));
    }
    cdf(q:number, shape:number, scale:number) {
        if (q < 0) return 0
        return P.lowRegGamma(shape, q / scale)
    }
    inv(p:number, shape:number, scale:number) {
        return P.gammapinv(p, shape) * scale
    }
    mean(shape:number, scale:number) {
        return shape * scale
    }
    mode(shape:number, scale:number) {
        if (shape > 1) return (shape - 1) * scale;
        throw Error(`Gamma.mode() should shape > 1, but shape=${shape}`)
    }
    variance(shape:number, scale:number) {
        return shape * scale * scale
    }
}

export class InvGamma extends Distribution {
    pdf(x:number, shape:number, scale:number) {
        if (x <= 0) return 0
        return exp(-(shape + 1) * log(x) - scale / x - P.gammaln(shape) + shape * log(scale))
    }
    cdf(q:number, shape:number, scale:number) {
        if (q <= 0) return 0
        return 1 - P.lowRegGamma(shape, scale / q)
    }
    inv(p:number, shape:number, scale:number) {
        return scale / P.gammapinv(1 - p, shape)
    }
    mean(shape:number, scale:number) {
        if (shape > 1) return scale / (shape - 1)
        throw Error(`InvGamma.mean() should be shape < 1, but shape=${shape}`)
    }
    mode(shape:number, scale:number) {
        return scale / (shape + 1)
    }
    variance(shape:number, scale:number) {
        if (shape <= 2) throw Error(`InvGamma.variance() should be shape > 2, but shape=${shape}`)
        return scale * scale / ((shape - 1) * (shape - 1) * (shape - 2))
    }
}

export class T extends Distribution {
    pdf(x:number, df:number) {
        df = df > 1e100 ? 1e100 : df
        return (1 / (sqrt(df) * P.betafn(0.5, df / 2))) * pow(1 + ((x * x) / df), -((df + 1) / 2))
    }
    cdf(q:number, df:number) {
        var dof2 = df / 2;
        return P.ibeta((q + sqrt(q * q + df)) /
            (2 * sqrt(q * q + df)), dof2, dof2)
    }
    inv(p:number, df:number) {
        var x = P.ibetainv(2 * min(p, 1 - p), 0.5 * df, 0.5)
        x = sqrt(df * (1 - x) / x)
        return (p > 0.5) ? x : -x
    }
    mean(df:number) {
        if (df > 1) return 0
        throw Error(`T.mean() should be df > 1, but df=${df}`)
    }
    median(df:number) { return 0 }
    mode(df:number) { return 0 }
    variance(df:number) {
        if (df > 2) return df / (df - 2) 
        else if (df > 1) return Infinity
        else throw Error(`T.variance() should be df > 1, but df=${df}`)
    }
}

export class Weibull extends Distribution {
    pdf(x:number, shape:number, scale:number) {
        if (x < 0 || scale < 0 || shape < 0)
            return 0;
        return (shape / scale) * pow((x / scale), (shape - 1)) * exp(-(pow((x / scale), shape)))
    }
    cdf(q:number, shape:number, scale:number) {
        return q < 0 ? 0 : 1 - exp(-pow((q / scale), shape))
    }
    inv(p:number, shape:number, scale:number) {
        return scale * pow(-log(1 - p), 1 / shape)
    }
    mean(shape:number, scale:number) {
        return scale * P.gammafn(1 + 1 / shape)
    }
    median(shape:number, scale:number) {
        return scale * pow(log(2), 1 / shape)
    }
    mode(shape:number, scale:number) {
        if (shape <= 1) return 0
        return scale * pow((shape - 1) / shape, 1 / shape)
    }
    variance(shape:number, scale:number) {
        return scale * scale * P.gammafn(1 + 2 / shape) -
            pow(weibull.mean(scale, shape), 2)
    }
}

export class Binomial extends Distribution {
    pdf(x:number, size:number, prob:number) {
        if (!int(x)) return 0
        return (prob === 0 || prob === 1) ?
            ((size * prob) === x ? 1 : 0) :
            P.combination(size, x) * pow(prob, x) * pow(1 - prob, size - x)
    }
    cdf(q:number, size:number, prob:number) {
        if (q < 0) return 0
        if (q < size) {
            let binomarr = []
            for (let k = 0; k <= q; k++) {
                binomarr[k] = this.pdf(k, prob, size)
            }
            return V.sum(binomarr)
        }
        return 1;
    }

}

export class NegBinomial extends Distribution {
    pdf(x:number, size:number, prob:number) {
        if (!int(x)) return 0
        if (x !== x >>> 0) throw Error()
        if (x < 0) return 0
        return P.combination(x + size - 1, size - 1) * pow(1 - prob, x) * pow(prob, size);
    }
    cdf(q:number, size:number, prob:number) {
        if (q < 0) return 0
        let sum = 0
        for (let k = 0; k <= q; k++) {
            sum += negBinomial.pdf(k, size, prob)
        }
        return sum
    }
}

export class Poisson extends Distribution {
    pdf(x:number, lambda:number) {
        U.be(int(x))
        if (lambda < 0 || (x % 1) !== 0 || x < 0) return 0
        return pow(lambda, x) * exp(-lambda) / P.factorial(x)
    }
    cdf(q:number, lambda:number) {
        var sumarr = [], x = 0;
        if (q < 0) return 0;
        for (; x <= q; x++) {
            sumarr.push(poisson.pdf(x, lambda))
        }
        return V.sum(sumarr)
    }
    mean(lambda:number) { return 1 }
    variance(lambda:number) { return 1 }
}

export const uniform = new Uniform()
export const normal = new Normal()
export const exponential = new Exponential()
export const beta = new Beta()
export const f = new F()
export const chiSquare = new ChiSquare()
export const cauchy = new Cauchy()
export const gamma = new Gamma()
export const invGamma = new InvGamma()
export const t = new T()
export const weibull = new Weibull()
export const negBinomial = new NegBinomial()
export const poisson = new Poisson()
export const binomial = new Binomial()
