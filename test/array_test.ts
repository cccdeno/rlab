import * as T from 'https://deno.land/x/tdd/mod.ts'
import * as R from '../mod.ts'

Deno.test("array", () => {
  T.eq(R.array(3, "x"), ["x","x","x"])
})
