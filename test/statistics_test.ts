import * as T from '/tdd/mod.ts'
import * as R from '../mod.ts'
const { V } = R

Deno.test("samples()", () => {
    var x = R.samples([0, 1], 100)
    T.ok(V.sum(x) >= 20 && V.sum(x) <= 80)

    x = R.samples([0, 1], 100, false, [0.95, 0.05])
    T.ok(V.sum(x) < 10)

    let dices = R.range(1, 6)
    x = R.samples(dices, 6, true)
    T.ok(V.sum(x) == V.sum(R.range(1, 6)))

    x = R.samples(dices, 6, false)
    T.fail(() => R.samples(dices, 7, true))
})
