import * as U from './util.ts'
import * as V from './vector.ts'
import * as P from './probfunc.ts'
const {int} = U

const { log, pow, sqrt, PI, tan, atan, min } = Math

abstract class Distribution {
    abstract pdf(arg: {}): number;
    abstract cdf(arg: {}): number;
    inv(arg: { p: number }) { let { p } = arg; U.be(p >= 0 && p <= 1) }
    median(arg: {}) { return this.mean(arg) }
    mode(arg: {}) { return this.median(arg) } // 密度最大的點 -- https://en.wikipedia.org/wiki/Mode_(statistics)
    sample(arg: {}) {
        let p = Math.random()
        return this.inv(Object.assign({}, arg, { p }))
    }
    mean(arg: {}):number {
        throw Error(`mean() not implemented!`)
    }
    variance(arg: {}):number {
        throw Error(`variance() not implemented!`)
    }
    sd(arg: {}) { return Math.sqrt(this.variance(arg)) }
}

export class Uniform extends Distribution {
    pdf(arg: { x: number, min: number, max: number }) {
        let { x, min, max } = arg
        return (x < min || x > max) ? 0 : 1 / (max - min)
    }
    cdf(arg: { x: number, min: number, max: number }) {
        let { x, min, max } = arg
        if (x < min) return 0
        else if (x < max) return (x - min) / (max - min)
        return 1
    }
    inv(arg: { p: number, min: number, max: number }) {
        let { p, min, max } = arg
        return min + (p * (max - min))
    }
    mean(arg: { min: number, max: number }) {
        let { min, max } = arg
        return 0.5 * (min + max)
    }
    variance(arg: { min: number, max: number }) {
        let { min, max } = arg
        return pow(max - min, 2) / 12;
    }
}

export class Exponential extends Distribution {
    pdf(arg: { x: number, rate: number }) {
        let { x, rate } = arg
        return (x < 0) ? 0 : rate * Math.exp(-rate * x)
    }
    cdf(arg: { x: number, rate: number }) {
        let { x, rate } = arg
        return (x < 0) ? 0 : 1 - Math.exp(-rate * x)
    }
    inv(arg: { p: number, rate: number }) {
        let { p, rate } = arg
        return -log(1 - p) / rate
    }
    mean(arg: { rate: number }) {
        let { rate } = arg
        return 1 / rate
    }
    medium(arg: { rate: number }) {
        let { rate } = arg
        return (1 / rate) * log(2)
    }
    variance(arg: { rate: number }) {
        let { rate } = arg
        return 1 / (rate * rate)
    }
}

export class Normal extends Distribution {
    pdf(arg: { x: number, mu: number, sd: number }) {
        let { x, mu, sd } = arg
        let d = x - mu
        return 1 / (sqrt(2 * PI) * sd) * Math.exp(-(d * d) / (2 * sd * sd))
    }
    cdf(arg: { x: number, mu: number, sd: number }) {
        let { x, mu, sd } = arg
        return 0.5 * (1 + P.erf((x - mu) / sqrt(2 * sd * sd)))
    }
    inv(arg: { p: number, mu: number, sd: number }) {
        let { p, mu, sd } = arg
        return -1.41421356237309505 * sd * P.erfcinv(2 * p) + mu
    }
    mean(arg: { mu: number, sd: number }) {
        let { mu, sd } = arg
        return mu
    }
    variance(arg: { mu: number, sd: number }) {
        let { mu, sd } = arg
        return sd * sd
    }
}

export class Beta extends Distribution {
    pdf(arg: { x: number, alpha: number, beta: number }) {
        let { x, alpha, beta } = arg
        if (x > 1 || x < 0) return 0 // PDF is zero outside the support
        if (alpha == 1 && beta == 1) return 1 // PDF is one for the uniform case
        if (alpha < 512 && beta < 512) {
            return (pow(x, alpha - 1) * pow(1 - x, beta - 1)) / P.betafn(alpha, beta)
        } else {
            return Math.exp((alpha - 1) * log(x) +
                (beta - 1) * log(1 - x) -
                P.betaln(alpha, beta))
        }
    }
    cdf(arg: { x: number, alpha: number, beta: number }) {
        let { x, alpha, beta } = arg
        return (x > 1) ? 1 :
            (x < 0) ? 0 :
                P.ibeta(x, alpha, beta)
    }
    inv(arg: { p: number, alpha: number, beta: number }) {
        let { p, alpha, beta } = arg
        return P.ibetainv(p, alpha, beta)
    }
    mean(arg: { alpha: number, beta: number }) {
        let { alpha, beta } = arg
        return alpha / (alpha + beta)
    }
    median(arg: { alpha: number, beta: number }) {
        let { alpha, beta } = arg
        return P.ibetainv(0.5, alpha, beta)
    }
    mode(arg: { alpha: number, beta: number }) {
        let { alpha, beta } = arg
        return (alpha - 1) / (alpha + beta - 2)
    }
    variance(arg: { alpha: number, beta: number }) {
        let { alpha, beta } = arg
        return (alpha * beta) / (pow(alpha + beta, 2) * (alpha + beta + 1));
    }
}

export class F extends Distribution {
    pdf(arg:{ x:number, df1:number, df2:number }) {
        let { x, df1, df2 } = arg
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
        return f * binomial.pdf({ x: (df1 - 2) / 2, n: (df1 + df2 - 2) / 2, p })
    }
    cdf(arg:{ x:number, df1:number, df2:number }) {
        let { x, df1, df2 } = arg
        if (x < 0) return 0
        return P.ibeta((df1 * x) / (df1 * x + df2), df1 / 2, df2 / 2)
    }
    inv(arg:{ p:number, df1:number, df2:number }) {
        let { p, df1, df2 } = arg
        return df2 / (df1 * (1 / P.ibetainv(p, df1 / 2, df2 / 2) - 1))
    }
    mean(arg:{ df1:number, df2:number }) {
        let { df1, df2 } = arg
        if (df2 > 2) return df2 / (df2 - 2)
        throw Error(`F.mean() shold be df2 > 2, but df2=${df2}`)
    }
    variance(arg:{ df1:number, df2:number }) {
        let { df1, df2 } = arg
        if (df2 <= 4) throw Error(`F.variance() shold be df2 > 4, but df2=${df2}`)
        return 2 * df2 * df2 * (df1 + df2 - 2) / (df1 * (df2 - 2) * (df2 - 2) * (df2 - 4))
    }
}

export class Cauchy extends Distribution {
    pdf(arg:{ x:number, local:number, scale:number }) {
        let { x, local, scale } = arg
        if (scale < 0) return 0
        return (scale / (pow(x - local, 2) + pow(scale, 2))) / PI
    }
    cdf(arg:{ x:number, local:number, scale:number }) {
        let { x, local, scale } = arg
        return atan((x - local) / scale) / PI + 0.5
    }
    inv(arg:{ p:number, local:number, scale:number }) {
        let { p, local, scale } = arg
        return local + scale * tan(PI * (p - 0.5));
    }
    mean(arg:{ local:number, scale:number }) {
        let { local, scale } = arg
        return local
    }
}

export class ChiSquare extends Distribution {
    pdf(arg:{ x:number, dof:number }) {
        let { x, dof } = arg
        if (x < 0) return 0
        return (x === 0 && dof === 2) ? 0.5 :
            Math.exp((dof / 2 - 1) * log(x) - x / 2 - (dof / 2) * log(2) - P.gammaln(dof / 2))
    }
    cdf(arg:{ x:number, dof:number }) {
        let { x, dof } = arg
        if (x < 0) return 0
        return P.lowRegGamma(dof / 2, x / 2)
    }
    inv(arg:{ p:number, dof:number }) {
        let { p, dof } = arg
        return 2 * P.gammapinv(p, 0.5 * dof)
    }
    mean(arg:{ dof:number }) {
        let { dof } = arg
        return dof
    }
    median(arg:{ dof:number }) {
        let { dof } = arg
        return dof * pow(1 - (2 / (9 * dof)), 3)
    }
    mode(arg:{ dof:number }) {
        let { dof } = arg
        return (dof - 2 > 0) ? dof - 2 : 0
    }
    variance(arg:{ dof:number }) {
        let { dof } = arg
        return 2 * dof
    }
}

export class Gamma extends Distribution {
    pdf(arg:{ x:number, shape:number, scale:number }) {
        let { x, shape, scale } = arg
        if (x < 0) return 0
        return (x === 0 && shape === 1) ? 1 / scale :
            Math.exp((shape - 1) * log(x) - x / scale - P.gammaln(shape) - shape * log(scale));
    }
    cdf(arg:{ x:number, shape:number, scale:number }) {
        let { x, shape, scale } = arg
        if (x < 0) return 0
        return P.lowRegGamma(shape, x / scale)
    }
    inv(arg:{ p:number, shape:number, scale:number }) {
        let { p, shape, scale } = arg
        return P.gammapinv(p, shape) * scale
    }
    mean(arg:{ shape:number, scale:number }) {
        let { shape, scale } = arg
        return shape * scale
    }
    mode(arg:{ shape:number, scale:number }) {
        let { shape, scale } = arg
        if (shape > 1) return (shape - 1) * scale;
        throw Error(`Gamma.mode() should shape > 1, but shape=${shape}`)
    }
    variance(arg:{ shape:number, scale:number }) {
        let { shape, scale } = arg
        return shape * scale * scale
    }
}

export class InvGamma extends Distribution {
    pdf(arg:{ x:number, shape:number, scale:number }) {
        let { x, shape, scale } = arg
        if (x <= 0) return 0
        return Math.exp(-(shape + 1) * log(x) - scale / x - P.gammaln(shape) + shape * log(scale))
    }
    cdf(arg:{ x:number, shape:number, scale:number }) {
        let { x, shape, scale } = arg
        if (x <= 0) return 0
        return 1 - P.lowRegGamma(shape, scale / x)
    }
    inv(arg:{ p:number, shape:number, scale:number }) {
        let { p, shape, scale } = arg
        return scale / P.gammapinv(1 - p, shape)
    }
    mean(arg:{ shape:number, scale:number }) {
        let { shape, scale } = arg
        if (shape > 1) return scale / (shape - 1)
        throw Error(`InvGamma.mean() should be shape < 1, but shape=${shape}`)
    }
    mode(arg:{ shape:number, scale:number }) {
        let { shape, scale } = arg
        return scale / (shape + 1)
    }
    variance(arg:{ shape:number, scale:number }) {
        let { shape, scale } = arg
        if (shape <= 2) throw Error(`InvGamma.variance() should be shape > 2, but shape=${shape}`)
        return scale * scale / ((shape - 1) * (shape - 1) * (shape - 2))
    }
}

export class T extends Distribution {
    pdf(arg:{ x:number, dof:number }) {
        let { x, dof } = arg
        dof = dof > 1e100 ? 1e100 : dof
        return (1 / (sqrt(dof) * P.betafn(0.5, dof / 2))) * pow(1 + ((x * x) / dof), -((dof + 1) / 2))
    }
    cdf(arg:{ x:number, dof:number }) {
        let { x, dof } = arg
        var dof2 = dof / 2;
        return P.ibeta((x + sqrt(x * x + dof)) /
            (2 * sqrt(x * x + dof)), dof2, dof2)
    }
    inv(arg:{ p:number, dof:number }) {
        let { p, dof } = arg
        var x = P.ibetainv(2 * min(p, 1 - p), 0.5 * dof, 0.5)
        x = sqrt(dof * (1 - x) / x)
        return (p > 0.5) ? x : -x
    }
    mean(arg:{ dof:number }) {
        let { dof } = arg
        if (dof > 1) return 0
        throw Error(`T.mean() should be dof > 1, but dof=${dof}`)
    }
    median(arg:{ dof:number }) { return 0 }
    mode(arg:{ dof:number }) { return 0 }
    variance(arg:{ dof:number }) {
        let { dof } = arg
        if (dof > 2) return dof / (dof - 2) 
        else if (dof > 1) return Infinity
        else throw Error(`T.variance() should be dof > 1, but dof=${dof}`)
    }
}

export class Weibull extends Distribution {
    pdf(arg:{ x:number, scale:number, shape:number }) {
        let { x, scale, shape } = arg
        if (x < 0 || scale < 0 || shape < 0)
            return 0;
        return (shape / scale) * pow((x / scale), (shape - 1)) * Math.exp(-(pow((x / scale), shape)))
    }
    cdf(arg:{ x:number, scale:number, shape:number }) {
        let { x, scale, shape } = arg
        return x < 0 ? 0 : 1 - Math.exp(-pow((x / scale), shape))
    }
    inv(arg:{ p:number, scale:number, shape:number }) {
        let { p, scale, shape } = arg
        return scale * pow(-log(1 - p), 1 / shape)
    }
    mean(arg:{ scale:number, shape:number }) {
        let { scale, shape } = arg
        return scale * P.gammafn(1 + 1 / shape)
    }
    median(arg:{ scale:number, shape:number }) {
        let { scale, shape } = arg
        return scale * pow(log(2), 1 / shape)
    }
    mode(arg:{ scale:number, shape:number }) {
        let { scale, shape } = arg
        if (shape <= 1) return 0
        return scale * pow((shape - 1) / shape, 1 / shape)
    }
    variance(arg:{ scale:number, shape:number }) {
        let { scale, shape } = arg
        return scale * scale * P.gammafn(1 + 2 / shape) -
            pow(weibull.mean({scale, shape}), 2)
    }
}

export class Binomial extends Distribution {
    pdf(arg:{ x:number, p:number, n:number }) {
        let { x:k, p, n } = arg
        U.be(int(k))
        return (p === 0 || p === 1) ?
            ((n * p) === k ? 1 : 0) :
            P.combination(n, k) * pow(p, k) * pow(1 - p, n - k)
    }
    cdf(arg:{ x:number, p:number, n:number }) {
        let { x, p, n } = arg
        if (x < 0) return 0
        if (x < n) {
            let binomarr = []
            for (let k = 0; k <= x; k++) {
                binomarr[k] = this.pdf({ x:k, p, n })
            }
            return V.sum(binomarr)
        }
        return 1;
    }

}

export class NegBinomial extends Distribution {
    pdf(arg:{ x:number, p:number, r:number }) {
        let { x:k, p, r } = arg
        U.be(int(k))
        if (k !== k >>> 0) throw Error()
        if (k < 0) return 0
        return P.combination(k + r - 1, r - 1) * pow(1 - p, k) * pow(p, r);
    }
    cdf(arg:{ x:number, p:number, r:number }) {
        let { x, p, r } = arg
        if (x < 0) return 0
        let sum = 0
        for (let k = 0; k <= x; k++) {
            sum += negBinomial.pdf({ x:k, r, p })
        }
        return sum
    }
}

export class Poisson extends Distribution {
    pdf(arg:{ x:number, l:number }) {
        let { x:k, l } = arg
        U.be(int(k))
        if (l < 0 || (k % 1) !== 0 || k < 0) return 0
        return pow(l, k) * Math.exp(-l) / P.factorial(k)
    }
    cdf(arg:{ x:number, l:number }) {
        let { x, l } = arg
        var sumarr = [], k = 0;
        if (x < 0) return 0;
        for (; k <= x; k++) {
            sumarr.push(poisson.pdf({ x:k, l }))
        }
        return V.sum(sumarr)
    }
    mean(arg:{ l:number }) { return 1 }
    variance(arg:{ l:number }) { return 1 }
}

export const uniform = new Uniform()
export const exponential = new Exponential()
export const normal = new Normal()
export const beta = new Beta()
export const f = new F()
export const chiSquare = new ChiSquare()
export const cauchy = new Cauchy()
export const gamma = new Gamma()
export const invGamma = new InvGamma()
export const t = new T()
export const weibull = new Weibull()
export const negBinomial = new NegBinomial()
// P.hyperGenomial = new HyperGenomial()
export const poisson = new Poisson()
export const binomial = new Binomial()
