import * as T from '/tdd/mod.ts'
import * as R from '../mod.ts'

Deno.test("array", () => {
  T.eq(R.array(3, "x"), ["x","x","x"])
})
