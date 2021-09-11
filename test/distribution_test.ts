import * as T from 'https://deno.land/x/tdd/mod.ts'
import * as R from '../mod.ts'
const { V } = R

Deno.test("Uniform Distribution", () => {
    const [x, min, max] = [1, 0, 4]
    T.near(R.dunif(x, min, max), 0.25)
})

Deno.test("Normal Distribution", () => {
    const [x, mean, sd] = [0, 0, 1]
    T.near(R.pnorm(x, mean, sd), 0.5)
})
