import * as T from 'https://deno.land/x/tdd/mod.ts'
import * as R from '../mod.ts'

let a = [2,4,6]
let b = [2,2,2]

Deno.test("op:map1", () => {
  T.eq(R.map1(a,(x)=>x*x), [4,16,36])
})

Deno.test("op:map2", () => {
  T.eq(R.map2(a,b,(x,y)=>x+y), [4,6,8])
})


