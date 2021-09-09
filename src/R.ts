import * as P from './probability.ts'

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
export const dexp = (arg:{x:number, rate:number}) => P.exp.pdf(arg)
export const pexp = (arg:{x:number, rate:number}) => P.exp.cdf(arg)
export const qexp = (arg:{p:number, rate:number}) => P.exp.inv(arg)
export const rexp = rsamples('exp')

// Normal Distribution
export const dnorm = (arg:{x:number, mu:number, sd:number}) => P.normal.pdf(arg)
export const pnorm = (arg:{x:number, mu:number, sd:number}) => P.normal.cdf(arg)
export const qnorm = (arg:{p:number, mu:number, sd:number}) => P.normal.inv(arg)
export const rnorm = rsamples('norm')
/* 
// Beta Distribution
export const dbeta = (arg:object) => P.beta.pdf(arg)
export const pbeta = (arg:object) => P.beta.cdf(arg)
export const qbeta = (arg:object) => P.beta.inv(arg)
export const rbeta = rsamples('beta')

// F Distribution
export const df = (arg:object) => P.f.pdf(arg)
export const pf = (arg:object) => P.f.cdf(arg)
export const qf = (arg:object) => P.f.inv(arg)
export const rf = rsamples('f')

// Cauchy Distribution
export const dcauchy = (arg:object) => P.cauchy.pdf(arg)
export const pcauchy = (arg:object) => P.cauchy.cdf(arg)
export const qcauchy = (arg:object) => P.cauchy.inv(arg)
export const rcauchy = rsamples('cauchy')

// ChiSquare Distribution
export const dchisq = (arg:object) => P.chiSquare.pdf(arg)
export const pchisq = (arg:object) => P.chiSquare.cdf(arg)
export const qchisq = (arg:object) => P.chiSquare.inv(arg)
export const rchisq = rsamples('chisq')

// Gamma Distribution
export const dgamma = (arg:object) => P.gamma.pdf(arg)
export const pgamma = (arg:object) => P.gamma.cdf(arg)
export const qgamma = (arg:object) => P.gamma.inv(arg)
export const rgamma = rsamples('gamma')

// InvGamma Distribution
export const dinvgamma = (arg:object) => P.invGamma.pdf(arg)
export const pinvgamma = (arg:object) => P.invGamma.cdf(arg)
export const qinvgamma = (arg:object) => P.invGamma.inv(arg)
export const rinvgamma = rsamples('invgamma')

// T Distribution
export const dt = (arg:object) => P.t.pdf(arg)
export const pt = (arg:object) => P.t.cdf(arg)
export const qt = (arg:object) => P.t.inv(arg)
export const rt = rsamples('t')

// Weibull Distribution
export const dweibull = (arg:object) => P.weibull.pdf(arg)
export const pweibull = (arg:object) => P.weibull.cdf(arg)
export const qweibull = (arg:object) => P.weibull.inv(arg)
export const rweibull = rsamples('weibull')
*/
