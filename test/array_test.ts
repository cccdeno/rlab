import {eq} from '../src/test.ts'
import * as A from '../src/array.ts'

Deno.test("array", () => {
  eq(A.array(3, "x"), ["x","x","x"])

})
