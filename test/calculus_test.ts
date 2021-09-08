import * as T from 'https://deno.land/x/tdd/mod.ts'
import * as m6 from '../mod.ts'

Deno.test("calculus", () => {
    var x = 0 // sin'(x) = cos(x)
    T.near(m6.diff(Math.sin, x), 1) // cos(0)=1
    x = Math.PI/3
    T.near(m6.diff(Math.sin, x), 1 / 2) // cos(pi/3)=1/2
})
