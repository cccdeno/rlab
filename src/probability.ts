import * as U from './util.ts'
// import * as R from './random.ts'
import * as P from './probfunc.ts'

let { log, pow, sqrt, PI, tan, atan, min } = Math

abstract class Distribution {
    abstract pdf(arg:{}):number;
    abstract cdf(arg:{}):number;
    inv(arg:{p:number}) { let { p } = arg; U.be(p >= 0 && p <= 1) }
    abstract mean(arg:{}):number;
    median(arg:{}) { return this.mean(arg) }
    mode(arg:{}) { return this.median(arg) } // 密度最大的點 -- https://en.wikipedia.org/wiki/Mode_(statistics)
    sample(arg:{}) {
        let p = Math.random()
        return this.inv(Object.assign({}, arg, { p }))
    }
    abstract variance(arg:{}):number;
    sd(arg:{}) { return Math.sqrt(this.variance(arg)) }
}

class Uniform extends Distribution {
    pdf(arg:{x:number,min:number,max:number}) {
        let { x, min, max } = arg
        return (x < min || x > max) ? 0 : 1 / (max - min)
    }
    cdf(arg:{x:number,min:number,max:number}) {
        let { x, min, max } = arg
        if (x < min) return 0
        else if (x < max) return (x - min) / (max - min)
        return 1
    }
    inv(arg:{p:number,min:number,max:number}) {
        let { p, min, max } = arg
        return min + (p * (max - min))
    }
    mean(arg:{min:number,max:number}) {
        let { min, max } = arg
        return 0.5 * (min + max)
    }
    variance(arg:{min:number,max:number}) {
        let { min, max } = arg
        return pow(max - min, 2) / 12;
    }
}

class Exp extends Distribution {
    pdf(arg:{x:number, rate:number}) {
        let { x, rate } = arg
        return (x < 0) ? 0 : rate * Math.exp(-rate * x)
    }
    cdf(arg:{x:number, rate:number}) {
        let { x, rate } = arg
        return (x < 0) ? 0 : 1 - Math.exp(-rate * x)
    }
    inv(arg:{p:number, rate:number}) {
        let { p, rate } = arg
        return -log(1 - p) / rate
    }
    mean(arg:{rate:number}) {
        let { rate } = arg
        return 1 / rate
    }
    medium(arg:{rate:number}) {
        let { rate } = arg
        return (1 / rate) * log(2)
    }
    variance(arg:{rate:number}) {
        let { rate } = arg
        return 1 / (rate * rate)
    }
}

class Normal extends Distribution {
    pdf(arg:{x:number, mu:number, sd:number}) {
        let { x, mu, sd } = arg
        let d = x - mu
        return 1 / (sqrt(2 * PI) * sd) * Math.exp(-(d * d) / (2 * sd * sd))
    }
    cdf(arg:{x:number, mu:number, sd:number}) {
        let { x, mu, sd } = arg
        return 0.5 * (1 + P.erf((x - mu) / sqrt(2 * sd * sd)))
    }
    inv(arg:{p:number, mu:number, sd:number}) {
        let { p, mu, sd } = arg
        return -1.41421356237309505 * sd * P.erfcinv(2 * p) + mu
    }
    mean(arg:{mu:number, sd:number}) {
        let { mu, sd } = arg
        return mu
    }
    variance(arg:{mu:number, sd:number}) {
        let { mu, sd } = arg
        return sd * sd
    }
}

/*
class Beta extends Distribution {
    pdf(arg:object) {
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
    cdf(arg:object) {
        let { x, alpha, beta } = arg
        return (x > 1 || x < 0) ? (x > 1) * 1 : P.ibeta(x, alpha, beta)
    }
    inv(arg:object) {
        let { p, alpha, beta } = arg
        return P.ibetainv(p, alpha, beta)
    }
    mean(arg:object) {
        let { alpha, beta } = arg
        return alpha / (alpha + beta)
    }
    median(arg:object) {
        let { alpha, beta } = arg
        return P.ibetainv(0.5, alpha, beta)
    }
    mode(arg:object) {
        let { alpha, beta } = arg
        return (alpha - 1) / (alpha + beta - 2)
    }
    variance(arg:object) {
        let { alpha, beta } = arg
        return (alpha * beta) / (pow(alpha + beta, 2) * (alpha + beta + 1));
    }
}

class F extends Distribution {
    pdf(arg:object) {
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
        return f * P.binomial.pdf({ k: (df1 - 2) / 2, n: (df1 + df2 - 2) / 2, p })
    }
    cdf(arg:object) {
        let { x, df1, df2 } = arg
        if (x < 0) return 0
        return P.ibeta((df1 * x) / (df1 * x + df2), df1 / 2, df2 / 2)
    }
    inv(arg:object) {
        let { p, df1, df2 } = arg
        return df2 / (df1 * (1 / P.ibetainv(p, df1 / 2, df2 / 2) - 1))
    }
    mean(arg:object) {
        let { df1, df2 } = arg
        return (df2 > 2) ? df2 / (df2 - 2) : undefined
    }
    variance(arg:object) {
        let { df1, df2 } = arg
        if (df2 <= 4) return undefined
        return 2 * df2 * df2 * (df1 + df2 - 2) / (df1 * (df2 - 2) * (df2 - 2) * (df2 - 4))
    }
}

class Cauchy extends Distribution {
    pdf(arg:object) {
        let { x, local, scale } = arg
        if (scale < 0) return 0
        return (scale / (pow(x - local, 2) + pow(scale, 2))) / PI
    }
    cdf(arg:object) {
        let { x, local, scale } = arg
        return atan((x - local) / scale) / PI + 0.5
    }
    inv(arg:object) {
        let { p, local, scale } = arg
        return local + scale * tan(PI * (p - 0.5));
    }
    mean(arg:object) {
        let { local, scale } = arg
        return local
    }
}

class ChiSquare extends Distribution {
    pdf(arg:object) {
        let { x, dof } = arg
        if (x < 0) return 0
        return (x === 0 && dof === 2) ? 0.5 :
            Math.exp((dof / 2 - 1) * log(x) - x / 2 - (dof / 2) * log(2) - P.gammaln(dof / 2))
    }
    cdf(arg:object) {
        let { x, dof } = arg
        if (x < 0) return 0
        return P.lowRegGamma(dof / 2, x / 2)
    }
    inv(arg:object) {
        let { p, dof } = arg
        return 2 * P.gammapinv(p, 0.5 * dof)
    }
    mean(arg:object) {
        let { dof } = arg
        return dof
    }
    median(arg:object) {
        let { dof } = arg
        return dof * pow(1 - (2 / (9 * dof)), 3)
    }
    mode(arg:object) {
        let { dof } = arg
        return (dof - 2 > 0) ? dof - 2 : 0
    }
    variance(arg:object) {
        let { dof } = arg
        return 2 * dof
    }
}

class Gamma extends Distribution {
    pdf(arg:object) {
        let { x, shape, scale } = arg
        if (x < 0) return 0
        return (x === 0 && shape === 1) ? 1 / scale :
            Math.exp((shape - 1) * log(x) - x / scale - P.gammaln(shape) - shape * log(scale));
    }
    cdf(arg:object) {
        let { x, shape, scale } = arg
        if (x < 0) return 0
        return P.lowRegGamma(shape, x / scale)
    }
    inv(arg:object) {
        let { p, shape, scale } = arg
        return P.gammapinv(p, shape) * scale
    }
    mean(arg:object) {
        let { shape, scale } = arg
        return shape * scale
    }
    mode(arg:object) {
        let { shape, scale } = arg
        if (shape > 1) return (shape - 1) * scale;
        return undefined;
    }
    variance(arg:object) {
        let { shape, scale } = arg
        return shape * scale * scale
    }
}

class InvGamma extends Distribution {
    pdf(arg:object) {
        let { x, shape, scale } = arg
        if (x <= 0) return 0
        return Math.exp(-(shape + 1) * log(x) - scale / x - P.gammaln(shape) + shape * log(scale))
    }
    cdf(arg:object) {
        let { x, shape, scale } = arg
        if (x <= 0) return 0
        return 1 - P.lowRegGamma(shape, scale / x)
    }
    inv(arg:object) {
        let { p, shape, scale } = arg
        return scale / P.gammapinv(1 - p, shape)
    }
    mean(arg:object) {
        let { shape, scale } = arg
        return (shape > 1) ? scale / (shape - 1) : undefined
    }
    mode(arg:object) {
        let { shape, scale } = arg
        return scale / (shape + 1)
    }
    variance(arg:object) {
        let { shape, scale } = arg
        if (shape <= 2) return undefined
        return scale * scale / ((shape - 1) * (shape - 1) * (shape - 2))
    }
}

class T extends Distribution {
    pdf(arg:object) {
        let { x, dof } = arg
        dof = dof > 1e100 ? 1e100 : dof
        return (1 / (sqrt(dof) * P.betafn(0.5, dof / 2))) * pow(1 + ((x * x) / dof), -((dof + 1) / 2))
    }
    cdf(arg:object) {
        let { x, dof } = arg
        var dof2 = dof / 2;
        return P.ibeta((x + sqrt(x * x + dof)) /
            (2 * sqrt(x * x + dof)), dof2, dof2)
    }
    inv(arg:object) {
        let { p, dof } = arg
        var x = P.ibetainv(2 * min(p, 1 - p), 0.5 * dof, 0.5)
        x = sqrt(dof * (1 - x) / x)
        return (p > 0.5) ? x : -x
    }
    mean(arg:object) {
        let { dof } = arg
        return (dof > 1) ? 0 : undefined
    }
    median(arg:object) { return 0 }
    mode(arg:object) { return 0 }
    variance(arg:object) {
        let { dof } = arg
        return (dof > 2) ? dof / (dof - 2) : (dof > 1) ? Infinity : undefined
    }
}

class Weibull extends Distribution {
    pdf(arg:object) {
        let { x, scale, shape } = arg
        if (x < 0 || scale < 0 || shape < 0)
            return 0;
        return (shape / scale) * pow((x / scale), (shape - 1)) * Math.exp(-(pow((x / scale), shape)))
    }
    cdf(arg:object) {
        let { x, scale, shape } = arg
        return x < 0 ? 0 : 1 - Math.exp(-pow((x / scale), shape))
    }
    inv(arg:object) {
        let { p, scale, shape } = arg
        return scale * pow(-log(1 - p), 1 / shape)
    }
    mean(arg:object) {
        let { scale, shape } = arg
        return scale * P.gammafn(1 + 1 / shape)
    }
    median(arg:object) {
        let { scale, shape } = arg
        return scale * pow(log(2), 1 / shape)
    }
    mode(arg:object) {
        let { scale, shape } = arg
        if (shape <= 1) return 0
        return scale * pow((shape - 1) / shape, 1 / shape)
    }
    variance(arg:object) {
        let { scale, shape } = arg
        return scale * scale * P.gammafn(1 + 2 / shape) -
            pow(P.weibull.mean(scale, shape), 2)
    }
}

class Binomial extends Distribution {
    pdf(arg:object) {
        let { k, p, n } = arg
        return (p === 0 || p === 1) ?
            ((n * p) === k ? 1 : 0) :
            P.combination(n, k) * pow(p, k) * pow(1 - p, n - k)
    }
    cdf(arg:object) {
        let { x, p, n } = arg
        if (x < 0) return 0
        if (x < n) {
            let binomarr = []
            for (let k = 0; k <= x; k++) {
                binomarr[k] = this.pdf({ k, p, n })
            }
            return V.sum(binomarr)
        }
        return 1;
    }
}

class NegBinomial extends Distribution {
    pdf(arg:object) {
        let { k, p, r } = arg
        if (k !== k >>> 0) return false
        if (k < 0) return 0
        return P.combination(k + r - 1, r - 1) * pow(1 - p, k) * pow(p, r);
    }
    cdf(arg:object) {
        let { x, p, r } = arg
        if (x < 0) return 0
        let sum = 0
        for (let k = 0; k <= x; k++) {
            sum += P.negBinomial.pdf({ k, r, p })
        }
        return sum
    }
}

class Poisson extends Distribution {
    pdf(arg:object) {
        let { k, l } = arg
        if (l < 0 || (k % 1) !== 0 || k < 0) return 0
        return pow(l, k) * Math.exp(-l) / P.factorial(k)
    }
    cdf(arg:object) {
        let { x, l } = arg
        var sumarr = [], k = 0;
        if (x < 0) return 0;
        for (; k <= x; k++) {
            sumarr.push(P.poisson.pdf({ k, l }))
        }
        return V.sum(sumarr)
    }
    mean(arg:object) { return 1 }
    variance(arg:object) { return 1 }
}
*/
export const uniform = new Uniform()
export const exp = new Exp()
export const normal = new Normal()
/*
export const beta = new Beta()
export const f = new F()
export const chiSquare = new ChiSquare()
export const cauchy = new Cauchy()
export const gamma = new Gamma()
export const invGamma = new InvGamma()
export const t = new T()
export const weibull = new Weibull()
export const binomial = new Binomial()
export const negBinomial = new NegBinomial()
// P.hyperGenomial = new HyperGenomial()
export const poisson = new Poisson()

*/
