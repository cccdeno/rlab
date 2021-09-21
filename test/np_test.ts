import * as T from '/tdd/mod.ts'
import { np } from '../mod.ts'

Deno.test("np: dot", () => {
    let t1 = np.tensor([[1,2], [3,4]])
    let t2 = np.tensor([[1,0], [0,1]])
    let t3 = np.dot(t1, t2)
    console.log('t3=', t3)
    T.eq(t1, t3)
})

Deno.test("np: sum", () => {
    var axis
    let t1 = np.tensor([[1, 2], [3, 4]])
    let s1a = t1.sum(axis=1)
    let s1b = t1.sum(axis=0)
    T.eq(s1a.toArray(), [3,7])
    T.eq(s1b.toArray(), [4,6])

    let t2 = np.tensor([[[1, 2], [3, 4]], [[5,6],[7,8]]])
    let s2a = t2.sum(axis=1)
    let s2b = t2.sum(axis=0)
    T.eq(s2a.toArray(), [[4,6], [12,14]])
    T.eq(s2b.toArray(), [[6,8], [10, 12]])
})
