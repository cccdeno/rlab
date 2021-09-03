import * as T from 'https://deno.land/x/tdd/mod.ts'
import * as N from '../mod.ts'

Deno.test("array", () => {
  T.eq(N.array(3, "x"), ["x","x","x"])
})
