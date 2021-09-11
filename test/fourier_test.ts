import * as T from '/tdd/mod.ts'
import * as R from '../mod.ts'

Deno.test("fourier", () => {
    var f = R.parseComplexList('1+2i,2+1i,1+2i,2+1i')
    var F = R.DFT(f)
    var f2 = R.iDFT(F)
    // console.log('f=', f)
    // console.log('F=', F)
    // console.log('f2=', f2)
    T.near(f2[0].a, f[0].a)
    // T.ok(V.near(f, f2))
})

