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
export const dunif = (arg:{x:number,min:number,max:number}) => P.uniform.pdf(arg)
export const punif = (arg:{x:number,min:number,max:number}) => P.uniform.cdf(arg)
export const qunif = (arg:{p:number,min:number,max:number}) => P.uniform.inv(arg)
export const runif = rsamples('uniform')

// Exponential Distribution
export const dexp = (arg:{x:number, rate:number}) => P.exponential.pdf(arg)
export const pexp = (arg:{x:number, rate:number}) => P.exponential.cdf(arg)
export const qexp = (arg:{p:number, rate:number}) => P.exponential.inv(arg)
export const rexp = rsamples('exp')

// Normal Distribution
export const dnorm = (arg:{x:number, mean:number, sd:number}) => P.normal.pdf(arg)
export const pnorm = (arg:{x:number, mean:number, sd:number}) => P.normal.cdf(arg)
export const qnorm = (arg:{p:number, mean:number, sd:number}) => P.normal.inv(arg)
export const rnorm = rsamples('norm')

// Beta Distribution
export const dbeta = (arg:{ x: number, alpha: number, beta: number }) => P.beta.pdf(arg)
export const pbeta = (arg:{ x: number, alpha: number, beta: number }) => P.beta.cdf(arg)
export const qbeta = (arg:{ p: number, alpha: number, beta: number }) => P.beta.inv(arg)
export const rbeta = rsamples('beta')

// F Distribution
export const df = (arg:{ x:number, df1:number, df2:number }) => P.f.pdf(arg)
export const pf = (arg:{ x:number, df1:number, df2:number }) => P.f.cdf(arg)
export const qf = (arg:{ p:number, df1:number, df2:number }) => P.f.inv(arg)
export const rf = rsamples('f')

// Cauchy Distribution
export const dcauchy = (arg:{ x:number, local:number, scale:number }) => P.cauchy.pdf(arg)
export const pcauchy = (arg:{ x:number, local:number, scale:number }) => P.cauchy.cdf(arg)
export const qcauchy = (arg:{ p:number, local:number, scale:number }) => P.cauchy.inv(arg)
export const rcauchy = rsamples('cauchy')

// ChiSquare Distribution
export const dchisq = (arg:{ x:number, dof:number }) => P.chiSquare.pdf(arg)
export const pchisq = (arg:{ x:number, dof:number }) => P.chiSquare.cdf(arg)
export const qchisq = (arg:{ p:number, dof:number }) => P.chiSquare.inv(arg)
export const rchisq = rsamples('chisq')

// Gamma Distribution
export const dgamma = (arg:{ x:number, shape:number, scale:number }) => P.gamma.pdf(arg)
export const pgamma = (arg:{ x:number, shape:number, scale:number }) => P.gamma.cdf(arg)
export const qgamma = (arg:{ p:number, shape:number, scale:number }) => P.gamma.inv(arg)
export const rgamma = rsamples('gamma')

// InvGamma Distribution
export const dinvgamma = (arg:{ x:number, shape:number, scale:number }) => P.invGamma.pdf(arg)
export const pinvgamma = (arg:{ x:number, shape:number, scale:number }) => P.invGamma.cdf(arg)
export const qinvgamma = (arg:{ p:number, shape:number, scale:number }) => P.invGamma.inv(arg)
export const rinvgamma = rsamples('invgamma')

// T Distribution
export const dt = (arg:{ x:number, dof:number }) => P.t.pdf(arg)
export const pt = (arg:{ x:number, dof:number }) => P.t.cdf(arg)
export const qt = (arg:{ p:number, dof:number }) => P.t.inv(arg)
export const rt = rsamples('t')

// Weibull Distribution
export const dweibull = (arg:{ x:number, scale:number, shape:number }) => P.weibull.pdf(arg)
export const pweibull = (arg:{ x:number, scale:number, shape:number }) => P.weibull.cdf(arg)
export const qweibull = (arg:{ p:number, scale:number, shape:number }) => P.weibull.inv(arg)
export const rweibull = rsamples('weibull')

// Binomial Distribution
export const dbinom = (arg:{ x:number, p:number, n:number }) => P.binomial.pdf(arg)
export const pbinom = (arg:{ x:number, p:number, n:number }) => P.binomial.cdf(arg)
// export const qbinom = (arg:{ p:number, p:number, n:number }) => P.binomial.inv(arg)
export const rbinom = rsamples('binomial')

// Negative Binomial Distribution
export const dnbinom = (arg:{ x:number, p:number, r:number }) => P.negBinomial.pdf(arg)
export const pnbinom = (arg:{ x:number, p:number, r:number }) => P.negBinomial.cdf(arg)
// export const qnbinom = (arg:{ p:number, scale:number, shape:number }) => P.negBinomial.inv(arg)
export const rnbinom = rsamples('negBinomial')

// Binomial Distribution
export const dpois = (arg:{ x:number, l:number }) => P.poisson.pdf(arg)
export const ppois = (arg:{ x:number, l:number }) => P.poisson.cdf(arg)
// export const qpois = (arg:{ x:number, l:number }) => P.poisson.inv(arg)
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
