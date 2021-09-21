import * as T from '/tdd/mod.ts'
import { np } from '../mod.ts'

Deno.test("np", () => {
    let t1 = np.tensor([[1,2], [3,4]])
    let t2 = np.tensor([[1,0], [0,1]])
    let t3 = np.dot(t1, t2)
    console.log('t3=', t3)
    T.eq(t1, t3)
})
