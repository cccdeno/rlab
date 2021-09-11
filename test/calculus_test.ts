import * as T from '/tdd/mod.ts'
import * as R from '../mod.ts'
const { PI, sin } = Math

Deno.test("diff", () => {
    var x = 0 // sin'(x) = cos(x)
    T.near(R.diff(sin, x), 1) // cos(0)=1
    x = PI/3
    T.near(R.diff(sin, x), 1 / 2) // cos(pi/3)=1/2
})

Deno.test("integral", () => {
    T.near(R.integral(sin, 0, PI), 2) // int(sin(x)) from 0 to pi is 2
    T.near(R.integral(sin, 0, 2*PI), 0) // int(sin(x)) from 0 to 2pi is 0
})
