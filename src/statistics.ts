import * as U from './util.ts'
import * as A from './array.ts'
import * as V from './vector.ts'
import * as P from './probability.ts'

export function samples(a: any[], n: number) {
  let s = new Array(n)
  for (let i = 0; i < n; i++) {
    s[i] = U.randomChoose(a)
  }
  return s
}

function rsamples(distribution:string) {
  return eval(`
      let f=function (arg) { 
        let {n} = arg, v = new Array(n)
        for (let i=0; i<n; i++) v[i] = P.${distribution}.sample(arg)
        return v
      }; f
    `)
}

// Uniform Distribution
export const dunif = (x:number,min:number,max:number) => P.uniform.pdf(x,min,max)
export const punif = (q:number,min:number,max:number) => P.uniform.cdf(q,min,max)
export const qunif = (p:number,min:number,max:number) => P.uniform.inv(p,min,max)
export const runif = rsamples('uniform')

// Normal Distribution
export const dnorm = (x:number, mean:number, sd:number) => P.normal.pdf(x,mean,sd)
export const pnorm = (q:number, mean:number, sd:number) => P.normal.cdf(q,mean,sd)
export const qnorm = (p:number, mean:number, sd:number) => P.normal.inv(p,mean,sd)
export const rnorm = rsamples('norm')

// Exponential Distribution
export const dexp = (x:number, rate:number) => P.exponential.pdf(x, rate)
export const pexp = (q:number, rate:number) => P.exponential.cdf(q, rate)
export const qexp = (p:number, rate:number) => P.exponential.inv(p, rate)
export const rexp = rsamples('exp')

// Beta Distribution
export const dbeta = ( x: number, shape1: number, shape2: number ) => P.beta.pdf(x, shape1, shape2)
export const pbeta = ( q: number, shape1: number, shape2: number ) => P.beta.cdf(q, shape1, shape2)
export const qbeta = ( p: number, shape1: number, shape2: number ) => P.beta.inv(p, shape1, shape2)
export const rbeta = rsamples('beta')

// F Distribution
export const df = ( x:number, df1:number, df2:number ) => P.f.pdf(x, df1, df2)
export const pf = ( q:number, df1:number, df2:number ) => P.f.cdf(q, df1, df2)
export const qf = ( p:number, df1:number, df2:number ) => P.f.inv(p, df1, df2)
export const rf = rsamples('f')

// Cauchy Distribution
export const dcauchy = ( x:number, location:number, scale:number ) => P.cauchy.pdf(x, location, scale)
export const pcauchy = ( q:number, location:number, scale:number ) => P.cauchy.cdf(q, location, scale)
export const qcauchy = ( p:number, location:number, scale:number ) => P.cauchy.inv(p, location, scale)
export const rcauchy = rsamples('cauchy')

// ChiSquare Distribution
export const dchisq = ( x:number, df:number ) => P.chiSquare.pdf(x, df)
export const pchisq = ( q:number, df:number ) => P.chiSquare.cdf(q, df)
export const qchisq = ( p:number, df:number ) => P.chiSquare.inv(p, df)
export const rchisq = rsamples('chisq')

// Gamma Distribution
export const dgamma = ( x:number, shape:number, scale:number ) => P.gamma.pdf(x, shape, scale)
export const pgamma = ( q:number, shape:number, scale:number ) => P.gamma.cdf(q, shape, scale)
export const qgamma = ( p:number, shape:number, scale:number ) => P.gamma.inv(p, shape, scale)
export const rgamma = rsamples('gamma')

// InvGamma Distribution
export const dinvgamma = ( x:number, shape:number, scale:number ) => P.invGamma.pdf(x, shape, scale)
export const pinvgamma = ( q:number, shape:number, scale:number ) => P.invGamma.cdf(q, shape, scale)
export const qinvgamma = ( p:number, shape:number, scale:number ) => P.invGamma.inv(p, shape, scale)
export const rinvgamma = rsamples('invgamma')

// T Distribution
export const dt = ( x:number, df:number ) => P.t.pdf(x, df)
export const pt = ( q:number, df:number ) => P.t.cdf(q, df)
export const qt = ( p:number, df:number ) => P.t.inv(p, df)
export const rt = rsamples('t')

// Weibull Distribution
export const dweibull = ( x:number, shape:number, scale:number ) => P.weibull.pdf(x, scale, shape)
export const pweibull = ( q:number, shape:number, scale:number ) => P.weibull.cdf(q, scale, shape)
export const qweibull = ( p:number, shape:number, scale:number ) => P.weibull.inv(p, scale, shape)
export const rweibull = rsamples('weibull')

// Binomial Distribution
export const dbinom = ( x:number, shape:number, scale:number ) => P.binomial.pdf(x, shape, scale)
export const pbinom = ( q:number, shape:number, scale:number ) => P.binomial.cdf(q, shape, scale)
export const qbinom = ( p:number, shape:number, scale:number ) => P.binomial.inv(p, shape, scale)
export const rbinom = rsamples('binomial')

// Negative Binomial Distribution
export const dnbinom = ( x:number, size:number, prob:number ) => P.negBinomial.pdf(x, size, prob)
export const pnbinom = ( q:number, size:number, prob:number ) => P.negBinomial.cdf(q, size, prob)
export const qnbinom = ( p:number, size:number, prob:number ) => P.negBinomial.inv(p, size, prob)
export const rnbinom = rsamples('negBinomial')

// Poisson Distribution
export const dpois = ( x:number, lambda:number ) => P.poisson.pdf(x, lambda)
export const ppois = ( q:number, lambda:number ) => P.poisson.cdf(q, lambda)
export const qpois = ( p:number, lambda:number ) => P.poisson.inv(p, lambda)
export const rpois = rsamples('poisson')

const EPSILON = 0.00000001

export function hist(a:number[], from:number = Math.floor(V.min(a)), to:number=Math.ceil(V.max(a)), step:number = 1) {
  var n = Math.ceil((to - from + EPSILON) / step)
  var xc = U.range(from + step / 2.0, to, step)
  var bins = A.array(n, 0)
  let len = a.length
  for (let i=0; i<len; i++) {
    var slot = Math.floor((a[i] - from) / step)
    if (slot >= 0 && slot < n) {
      bins[slot]++
    }
  }
  return {type: 'histogram', xc: xc, bins: bins, from: from, to: to, step: step}
}
