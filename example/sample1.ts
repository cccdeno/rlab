// import * as R from 'https://deno.land/x/rlab/mod.ts'
import * as R from '../mod.ts'
const { arg } = R

function hist(x:number[]) {
    var h = R.histogram(x)
    console.log(`h.bins=[${h.bins}]`)
}

var x, n=10000

x = R.runif(n, ...arg({min:0, max:10}))
hist(x)

x = R.rnorm(n, ...arg({mean:5, sd:2}))
hist(x)

var lambda = 2
x = R.rexp(n, lambda)
hist(x)

let dices = R.range(1,6)
x = R.samples(dices, n)
hist(x)
