import * as T from 'https://deno.land/x/tdd/mod.ts'
import { R } from '../mod.ts'

Deno.test("array", () => {
    console.log('R.punif({x:1, min:0, max:2})=', R.punif({ x: 1, min: 0, max: 2 }))
    T.near(R.punif({ x:1, min: 0, max: 2 }), 0.5)
    let x = R.runif({ n:10, min:0, max:2})
    console.log('x=', x)
    T.ok(x.length == 10)
})
