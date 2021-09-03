import * as T from 'https://deno.land/x/tdd/mod.ts'
import {Complex} from '../mod.ts'

let a = new Complex(1,2)
let b = new Complex(2,1)

Deno.test("complex:op", () => {
  T.eq(a.add(b), new Complex(3,3))
  T.eq(a.sub(b), new Complex(-1,1))
  T.eq(a.mul(b), new Complex(0,5))
})
