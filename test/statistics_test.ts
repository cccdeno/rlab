import * as T from 'https://deno.land/x/tdd/mod.ts'
import * as R from '../mod.ts'
const { V } = R

Deno.test("samples()", () => {
    var x = R.samples([0, 1], 100)
    console.log(x)
    T.ok(V.sum(x) >= 30 && V.sum(x) <= 70)

    x = R.samples([0, 1], 100, false, [0.95, 0.05])
    console.log(x)
    T.ok(V.sum(x) < 10)

    let dices = R.range(1, 6)
    console.log('dices=', dices)
    x = R.samples(dices, 6, true)
    console.log(x)
    T.ok(V.sum(x) == V.sum(R.range(1, 6)))
    x = R.samples(dices, 6, false)
    console.log(x)
    T.fail(() => R.samples(dices, 7, true))
})
