import * as T from '/tdd/mod.ts'
import * as R from '../mod.ts'

Deno.test("ndarray", () => {
    let a3d = R.ndarray([2,2,2], [1,2,3,4,5,6,7,8])
    // console.log(a3d)
    T.eq(a3d, [ [ [ 1, 2 ], [ 3, 4 ] ], [ [ 5, 6 ], [ 7, 8 ] ] ])
    let z3d = R.ndarray([2,2,2])
    // console.log(z3d)
    T.eq(z3d, [ [ [ 0, 0 ], [ 0, 0 ] ], [ [ 0, 0 ], [ 0, 0 ] ] ])
})
