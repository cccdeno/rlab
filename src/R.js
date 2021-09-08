import * as P from './probability.js'

function rdist(name) {
  return eval(`
      let f=function (arg) { 
        let {n} = arg, v = new Array(n)
        for (let i=0; i<n; i++) v[i] = P.${name}.sample(arg)
        return v
      }; f
    `)
}

// Uniform Distribution
export const dunif = (arg) => P.uniform.pdf(arg)
export const punif = (arg) => P.uniform.cdf(arg)
export const qunif = (arg) => P.uniform.inv(arg)
export const runif = rdist('uniform')

// Exponential Distribution
export const dexp = (arg) => P.exp.pdf(arg)
export const pexp = (arg) => P.exp.cdf(arg)
export const qexp = (arg) => P.exp.inv(arg)
export const rexp = rdist('exp')

// Normal Distribution
export const dnorm = (arg) => P.normal.pdf(arg)
export const pnorm = (arg) => P.normal.cdf(arg)
export const qnorm = (arg) => P.normal.inv(arg)
export const rnorm = rdist('norm')

// Beta Distribution
export const dbeta = (arg) => P.beta.pdf(arg)
export const pbeta = (arg) => P.beta.cdf(arg)
export const qbeta = (arg) => P.beta.inv(arg)
export const rbeta = rdist('beta')

// F Distribution
export const df = (arg) => P.f.pdf(arg)
export const pf = (arg) => P.f.cdf(arg)
export const qf = (arg) => P.f.inv(arg)
export const rf = rdist('f')

// Cauchy Distribution
export const dcauchy = (arg) => P.cauchy.pdf(arg)
export const pcauchy = (arg) => P.cauchy.cdf(arg)
export const qcauchy = (arg) => P.cauchy.inv(arg)
export const rcauchy = rdist('cauchy')

// ChiSquare Distribution
export const dchisq = (arg) => P.chiSquare.pdf(arg)
export const pchisq = (arg) => P.chiSquare.cdf(arg)
export const qchisq = (arg) => P.chiSquare.inv(arg)
export const rchisq = rdist('chisq')

// Gamma Distribution
export const dgamma = (arg) => P.gamma.pdf(arg)
export const pgamma = (arg) => P.gamma.cdf(arg)
export const qgamma = (arg) => P.gamma.inv(arg)
export const rgamma = rdist('gamma')

// InvGamma Distribution
export const dinvgamma = (arg) => P.invGamma.pdf(arg)
export const pinvgamma = (arg) => P.invGamma.cdf(arg)
export const qinvgamma = (arg) => P.invGamma.inv(arg)
export const rinvgamma = rdist('invgamma')

// T Distribution
export const dt = (arg) => P.t.pdf(arg)
export const pt = (arg) => P.t.cdf(arg)
export const qt = (arg) => P.t.inv(arg)
export const rt = rdist('t')

// Weibull Distribution
export const dweibull = (arg) => P.weibull.pdf(arg)
export const pweibull = (arg) => P.weibull.cdf(arg)
export const qweibull = (arg) => P.weibull.inv(arg)
export const rweibull = rdist('weibull')
