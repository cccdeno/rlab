import * as T from 'https://deno.land/x/tdd/mod.ts'
import { Complex, parseComplex, parseComplexList } from '../mod.ts'

let a = new Complex(1,2)
let b = new Complex(2,1)

Deno.test("complex:op", () => {
  T.eq(a.add(b), new Complex(3,3))
  T.eq(a.sub(b), new Complex(-1,1))
  T.eq(a.mul(b), new Complex(0,5))
  var c
  c = parseComplex('1+2i')
  T.ok(c.a == 1 && c.b == 2)
  c = parseComplex('2.718+3.1416i')
  let list = parseComplexList('1+2i,2+1i,3')
  
  console.log('list=', list)
})
