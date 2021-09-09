import * as T from 'https://deno.land/x/tdd/mod.ts'
import { Tensor } from '../mod.ts'

Deno.test("tensor", () => {
    let t1 = new Tensor([2,2], [1,2,3,4])
    T.eq(t1.max(), 4)
    console.log('t1.neg()=', t1.neg())
    T.eq(t1.neg().v, [-1,-2,-3,-4])

    let t1map1 = t1.map1((x)=>x*x)
    console.log('t1map=', t1map1)
    T.eq(t1map1.toVector(), [1,4,9,16])

    T.eq(t1.sum(), 10)

    let t2 = new Tensor([2,2], [1,1,1,1])
    let a1 = t1.toArray()
    console.log('a1=', a1)
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
    console.log('a3d=', a3d)
})
