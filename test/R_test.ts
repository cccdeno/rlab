import * as T from 'https://deno.land/x/tdd/mod.ts'
import { R } from '../mod.ts'

Deno.test("Uniform Distribution", () => {
    T.near(R.dunif({ x: 1, min: 0, max: 4 }), 0.25)
    // let x = R.runif({ n: 10, min: 0, max: 2 })
    // T.ok(x.length == 10)
})

Deno.test("Normal Distribution", () => {
    T.near(R.pnorm({ x: 0, mu: 0, sd: 1 }), 0.5)
})
