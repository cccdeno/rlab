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
    cdf(x:number, min: number, max: number) {
        if (x < min) return 0
        else if (x < max) return (x - min) / (max - min)
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
    cdf(x: number, mean: number, sd: number) {
        return 0.5 * (1 + P.erf((x - mean) / sqrt(2 * sd * sd)))
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
    cdf(x: number, rate: number) {
        return (x < 0) ? 0 : 1 - exp(-rate * x)
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
    pdf(x: number, alpha: number, beta: number) {
        if (x > 1 || x < 0) return 0 // PDF is zero outside the support
        if (alpha == 1 && beta == 1) return 1 // PDF is one for the uniform case
        if (alpha < 512 && beta < 512) {
            return (pow(x, alpha - 1) * pow(1 - x, beta - 1)) / P.betafn(alpha, beta)
        } else {
            return exp((alpha - 1) * log(x) +
                (beta - 1) * log(1 - x) -
                P.betaln(alpha, beta))
        }
    }
    cdf(x: number, alpha: number, beta: number) {
        return (x > 1) ? 1 :
            (x < 0) ? 0 :
                P.ibeta(x, alpha, beta)
    }
    inv(p: number, alpha: number, beta: number) {
        return P.ibetainv(p, alpha, beta)
    }
    mean(alpha: number, beta: number) {
        return alpha / (alpha + beta)
    }
    median(alpha: number, beta: number) {
        return P.ibetainv(0.5, alpha, beta)
    }
    mode(alpha: number, beta: number) {
        return (alpha - 1) / (alpha + beta - 2)
    }
    variance(alpha: number, beta: number) {
        return (alpha * beta) / (pow(alpha + beta, 2) * (alpha + beta + 1));
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
    cdf(x:number, df1:number, df2:number) {
        if (x < 0) return 0
        return P.ibeta((df1 * x) / (df1 * x + df2), df1 / 2, df2 / 2)
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
    pdf(x:number, local:number, scale:number) {
        if (scale < 0) return 0
        return (scale / (pow(x - local, 2) + pow(scale, 2))) / PI
    }
    cdf(x:number, local:number, scale:number) {
        return atan((x - local) / scale) / PI + 0.5
    }
    inv(p:number, local:number, scale:number) {
        return local + scale * tan(PI * (p - 0.5));
    }
    mean(local:number, scale:number) {
        return local
    }
}

export class ChiSquare extends Distribution {
    pdf(x:number, dof:number) {
        if (x < 0) return 0
        return (x === 0 && dof === 2) ? 0.5 :
            exp((dof / 2 - 1) * log(x) - x / 2 - (dof / 2) * log(2) - P.gammaln(dof / 2))
    }
    cdf(x:number, dof:number) {
        if (x < 0) return 0
        return P.lowRegGamma(dof / 2, x / 2)
    }
    inv(p:number, dof:number) {
        return 2 * P.gammapinv(p, 0.5 * dof)
    }
    mean(dof:number) {
        return dof
    }
    median(dof:number) {
        return dof * pow(1 - (2 / (9 * dof)), 3)
    }
    mode(dof:number) {
        return (dof - 2 > 0) ? dof - 2 : 0
    }
    variance(dof:number) {
        return 2 * dof
    }
}

export class Gamma extends Distribution {
    pdf(x:number, shape:number, scale:number) {
        if (x < 0) return 0
        return (x === 0 && shape === 1) ? 1 / scale :
            exp((shape - 1) * log(x) - x / scale - P.gammaln(shape) - shape * log(scale));
    }
    cdf(x:number, shape:number, scale:number) {
        if (x < 0) return 0
        return P.lowRegGamma(shape, x / scale)
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
    cdf(x:number, shape:number, scale:number) {
        if (x <= 0) return 0
        return 1 - P.lowRegGamma(shape, scale / x)
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
    pdf(x:number, dof:number) {
        dof = dof > 1e100 ? 1e100 : dof
        return (1 / (sqrt(dof) * P.betafn(0.5, dof / 2))) * pow(1 + ((x * x) / dof), -((dof + 1) / 2))
    }
    cdf(x:number, dof:number) {
        var dof2 = dof / 2;
        return P.ibeta((x + sqrt(x * x + dof)) /
            (2 * sqrt(x * x + dof)), dof2, dof2)
    }
    inv(p:number, dof:number) {
        var x = P.ibetainv(2 * min(p, 1 - p), 0.5 * dof, 0.5)
        x = sqrt(dof * (1 - x) / x)
        return (p > 0.5) ? x : -x
    }
    mean(dof:number) {
        if (dof > 1) return 0
        throw Error(`T.mean() should be dof > 1, but dof=${dof}`)
    }
    median(dof:number) { return 0 }
    mode(dof:number) { return 0 }
    variance(dof:number) {
        if (dof > 2) return dof / (dof - 2) 
        else if (dof > 1) return Infinity
        else throw Error(`T.variance() should be dof > 1, but dof=${dof}`)
    }
}

export class Weibull extends Distribution {
    pdf(x:number, scale:number, shape:number) {
        if (x < 0 || scale < 0 || shape < 0)
            return 0;
        return (shape / scale) * pow((x / scale), (shape - 1)) * exp(-(pow((x / scale), shape)))
    }
    cdf(x:number, scale:number, shape:number) {
        return x < 0 ? 0 : 1 - exp(-pow((x / scale), shape))
    }
    inv(p:number, scale:number, shape:number) {
        return scale * pow(-log(1 - p), 1 / shape)
    }
    mean(scale:number, shape:number) {
        return scale * P.gammafn(1 + 1 / shape)
    }
    median(scale:number, shape:number) {
        return scale * pow(log(2), 1 / shape)
    }
    mode(scale:number, shape:number) {
        if (shape <= 1) return 0
        return scale * pow((shape - 1) / shape, 1 / shape)
    }
    variance(scale:number, shape:number) {
        return scale * scale * P.gammafn(1 + 2 / shape) -
            pow(weibull.mean(scale, shape), 2)
    }
}

export class Binomial extends Distribution {
    pdf(k:number, p:number, n:number) {
        if (!int(k)) return 0
        return (p === 0 || p === 1) ?
            ((n * p) === k ? 1 : 0) :
            P.combination(n, k) * pow(p, k) * pow(1 - p, n - k)
    }
    cdf(x:number, p:number, n:number) {
        if (x < 0) return 0
        if (x < n) {
            let binomarr = []
            for (let k = 0; k <= x; k++) {
                binomarr[k] = this.pdf(k, p, n)
            }
            return V.sum(binomarr)
        }
        return 1;
    }

}

export class NegBinomial extends Distribution {
    pdf(k:number, p:number, r:number) {
        if (!int(k)) return 0
        if (k !== k >>> 0) throw Error()
        if (k < 0) return 0
        return P.combination(k + r - 1, r - 1) * pow(1 - p, k) * pow(p, r);
    }
    cdf(x:number, p:number, r:number) {
        if (x < 0) return 0
        let sum = 0
        for (let k = 0; k <= x; k++) {
            sum += negBinomial.pdf(k, r, p)
        }
        return sum
    }
}

export class Poisson extends Distribution {
    pdf(k:number, l:number) {
        U.be(int(k))
        if (l < 0 || (k % 1) !== 0 || k < 0) return 0
        return pow(l, k) * exp(-l) / P.factorial(k)
    }
    cdf(x:number, l:number) {
        var sumarr = [], k = 0;
        if (x < 0) return 0;
        for (; k <= x; k++) {
            sumarr.push(poisson.pdf(k, l))
        }
        return V.sum(sumarr)
    }
    mean(l:number) { return 1 }
    variance(l:number) { return 1 }
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