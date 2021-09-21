import * as T from '/tdd/mod.ts'
import * as R from '../mod.ts'

Deno.test("ndarray: ndarray()", () => {
    let a3d = R.ndarray([2,2,2], [1,2,3,4,5,6,7,8])
    // console.log(a3d)
    T.eq(a3d, [ [ [ 1, 2 ], [ 3, 4 ] ], [ [ 5, 6 ], [ 7, 8 ] ] ])
    let z3d = R.ndarray([2,2,2])
    // console.log(z3d)
    T.eq(z3d, [ [ [ 0, 0 ], [ 0, 0 ] ], [ [ 0, 0 ], [ 0, 0 ] ] ])
})

Deno.test("ndarray: ndist()", () => {
    var axis, shape=[2,2,2], v=[0,1,2,3,4,5,6,7]
    let d0 = R.ndist(shape, v, axis=0)
    T.eq(d0, [ [ 0, 1, 2, 3 ], [ 4, 5, 6, 7 ] ])
    let d1 = R.ndist(shape, v, axis=1)
    T.eq(d1, [ [ 0, 1, 4, 5 ], [ 2, 3, 6, 7 ] ])
    let d2 = R.ndist(shape, v, axis=2)
    T.eq(d2, [ [ 0, 2, 4, 6 ], [ 1, 3, 5, 7 ] ])
})

Deno.test("ndarray: ncollapse()", () => {
    var axis, shape=[2,2,2], v=[0,1,2,3,4,5,6,7]
    let d0 = R.ncollapse(shape, v, axis=0)
    T.eq(d0, [ [ 0, 4 ], [ 1, 5 ], [ 2, 6 ], [ 3, 7 ] ])
    let d1 = R.ncollapse(shape, v, axis=1)
    T.eq(d1, [ [ 0, 2 ], [ 1, 3 ], [ 4, 6 ], [ 5, 7 ] ])
    let d2 = R.ncollapse(shape, v, axis=2)
    T.eq(d2, [ [ 0, 1 ], [ 2, 3 ], [ 4, 5 ], [ 6, 7 ] ])
})
