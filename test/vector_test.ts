import * as T from 'https://deno.land/x/tdd/mod.ts'
import { V } from '../mod.ts'

let a = [2,4,6]
let b = [2,2,2]

Deno.test("vector: binary op", () => {
  // V.add([1,2], "a")
  T.eq(V.add(a,b), [4,6,8])
  T.eq(V.sub(a,b), [0,2,4])
  T.eq(V.mul(a,b), [4,8,12])
  T.eq(V.div(a,b), [1,2,3])
  T.eq(V.dot(a,b), 24)
})

/*
Deno.test("vector: const op", () => {
  eq(V.addc(a,1), [3,5,7])
  eq(V.subc(a,1), [1,3,5])
  eq(V.mulc(a,2), [4,8,12])
  eq(V.divc(a,2), [1,2,3])
})
*/
