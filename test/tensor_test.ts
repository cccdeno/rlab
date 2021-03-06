import * as T from '/tdd/mod.ts'
import { Tensor } from '../mod.ts'

Deno.test("tensor", () => {
    let t1 = new Tensor([2,2], [1,2,3,4])
    T.eq(t1.max(), 4)
    T.eq(t1.neg().v, [-1,-2,-3,-4])

    let t1map1 = t1.map1((x)=>x*x)
    T.eq(t1map1.toVector(), [1,4,9,16])

    T.eq(t1.sum(), 10)

    let t2 = new Tensor([2,2], [1,1,1,1])
    let a1 = t1.toArray()
    T.eq(a1, [[1,2],[3,4]])

    let t3 = t1.add(t2)
    T.eq(t3.v, [2,3,4,5])
    T.eq(t3.get([1,0]), 4)
    t3.set([1,0], 0)
    T.eq(t3.v, [2,3,0,5])

    let t4 = t1.map2(t2, (a,b)=>a-b)
    T.eq(t4.v, [0,1,2,3])

    let t3d = new Tensor([2,2,2], [1,2,3,4,5,6,7,8])
    let a3d = t3d.toArray()
    T.eq(a3d, [[[1,2],[3,4]],[[5,6],[7,8]]])

    let t3d2 = Tensor.fromArray(a3d)
    T.eq(t3d2, t3d)

    // console.log(t3d2)
})
