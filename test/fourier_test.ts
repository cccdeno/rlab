import * as T from 'https://deno.land/x/tdd/mod.ts'
import { DFT, iDFT, parseComplexList } from '../mod.ts'

Deno.test("fourier", () => {
    var f = parseComplexList('1+2i,2+1i,1+2i,2+1i')
    var F = DFT(f)
    var f2 = iDFT(F)
    console.log('f=', f)
    console.log('F=', F)
    console.log('f2=', f2)
    T.near(f2[0].a, f[0].a)
    // T.ok(V.near(f, f2))
})

