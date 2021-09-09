import * as T from 'https://deno.land/x/tdd/mod.ts'
import * as M from '../mod.ts'
const {PI, E} = Math

Deno.test("diff", () => {
    var x = 0 // sin'(x) = cos(x)
    T.near(M.diff(Math.sin, x), 1) // cos(0)=1
    x = PI/3
    T.near(M.diff(Math.sin, x), 1 / 2) // cos(pi/3)=1/2
})

Deno.test("integral", () => {
    T.near(M.integral(Math.sin, 0, PI), 2) // int(sin(x)) from 0 to pi is 2
    T.near(M.integral(Math.sin, 0, 2*PI), 0) // int(sin(x)) from 0 to 2pi is 0
})
