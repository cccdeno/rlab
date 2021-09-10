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
export const punif = (x:number,min:number,max:number) => P.uniform.cdf(x,min,max)
export const qunif = (p:number,min:number,max:number) => P.uniform.inv(p,min,max)
export const runif = rsamples('uniform')

// Normal Distribution
export const dnorm = (x:number, mean:number, sd:number) => P.normal.pdf(x,mean,sd)
export const pnorm = (x:number, mean:number, sd:number) => P.normal.cdf(x,mean,sd)
export const qnorm = (p:number, mean:number, sd:number) => P.normal.inv(p,mean,sd)
export const rnorm = rsamples('norm')

/*
// Exponential Distribution
export const dexp = (x:number, rate:number) => P.exponential.pdf(x, rate)
export const pexp = (x:number, rate:number) => P.exponential.cdf(x, rate)
export const qexp = (p:number, rate:number) => P.exponential.inv(x, rate)
export const rexp = rsamples('exp')

// Beta Distribution
export const dbeta = ( x: number, alpha: number, beta: number ) => P.beta.pdf(arg)
export const pbeta = ( x: number, alpha: number, beta: number ) => P.beta.cdf(arg)
export const qbeta = ( p: number, alpha: number, beta: number ) => P.beta.inv(arg)
export const rbeta = rsamples('beta')

// F Distribution
export const df = ( x:number, df1:number, df2:number ) => P.f.pdf(arg)
export const pf = ( x:number, df1:number, df2:number ) => P.f.cdf(arg)
export const qf = ( p:number, df1:number, df2:number ) => P.f.inv(arg)
export const rf = rsamples('f')

// Cauchy Distribution
export const dcauchy = ( x:number, local:number, scale:number ) => P.cauchy.pdf(arg)
export const pcauchy = ( x:number, local:number, scale:number ) => P.cauchy.cdf(arg)
export const qcauchy = ( p:number, local:number, scale:number ) => P.cauchy.inv(arg)
export const rcauchy = rsamples('cauchy')

// ChiSquare Distribution
export const dchisq = ( x:number, dof:number ) => P.chiSquare.pdf(arg)
export const pchisq = ( x:number, dof:number ) => P.chiSquare.cdf(arg)
export const qchisq = ( p:number, dof:number ) => P.chiSquare.inv(arg)
export const rchisq = rsamples('chisq')

// Gamma Distribution
export const dgamma = ( x:number, shape:number, scale:number ) => P.gamma.pdf(arg)
export const pgamma = ( x:number, shape:number, scale:number ) => P.gamma.cdf(arg)
export const qgamma = ( p:number, shape:number, scale:number ) => P.gamma.inv(arg)
export const rgamma = rsamples('gamma')

// InvGamma Distribution
export const dinvgamma = ( x:number, shape:number, scale:number ) => P.invGamma.pdf(arg)
export const pinvgamma = ( x:number, shape:number, scale:number ) => P.invGamma.cdf(arg)
export const qinvgamma = ( p:number, shape:number, scale:number ) => P.invGamma.inv(arg)
export const rinvgamma = rsamples('invgamma')

// T Distribution
export const dt = ( x:number, dof:number ) => P.t.pdf(arg)
export const pt = ( x:number, dof:number ) => P.t.cdf(arg)
export const qt = ( p:number, dof:number ) => P.t.inv(arg)
export const rt = rsamples('t')

// Weibull Distribution
export const dweibull = ( x:number, scale:number, shape:number ) => P.weibull.pdf(arg)
export const pweibull = ( x:number, scale:number, shape:number ) => P.weibull.cdf(arg)
export const qweibull = ( p:number, scale:number, shape:number ) => P.weibull.inv(arg)
export const rweibull = rsamples('weibull')

// Binomial Distribution
export const dbinom = ( x:number, p:number, n:number ) => P.binomial.pdf(arg)
export const pbinom = ( x:number, p:number, n:number ) => P.binomial.cdf(arg)
// export const qbinom = ( p:number, p:number, n:number ) => P.binomial.inv(arg)
export const rbinom = rsamples('binomial')

// Negative Binomial Distribution
export const dnbinom = ( x:number, p:number, r:number ) => P.negBinomial.pdf(arg)
export const pnbinom = ( x:number, p:number, r:number ) => P.negBinomial.cdf(arg)
// export const qnbinom = ( p:number, scale:number, shape:number ) => P.negBinomial.inv(arg)
export const rnbinom = rsamples('negBinomial')

// Binomial Distribution
export const dpois = ( x:number, l:number ) => P.poisson.pdf(arg)
export const ppois = ( x:number, l:number ) => P.poisson.cdf(arg)
// export const qpois = ( x:number, l:number ) => P.poisson.inv(arg)
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
*/