import * as T from 'https://deno.land/x/tdd/mod.ts'
import * as R from '../mod.ts'

Deno.test("math", () => {
  T.eq(R.abs(-3), 3)
})
