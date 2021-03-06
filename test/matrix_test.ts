import * as T from '/tdd/mod.ts'
import * as R from '../mod.ts'
const { M, V } = R

let a = [[1,2],[3,4]]
var at:number[][]

Deno.test("matrix: transpose", () => {
  at = M.transpose(a)
  T.eq(at, [[1,3], [2,4]])
})

Deno.test("matrix: diag", () => {
  let D = M.diag([1,2,3])
  T.eq(R.flatten(D), [1,0,0, 0,2,0, 0,0,3])
})

Deno.test("matrix: identity", () => {
  let I = M.identity(3)
  T.eq(R.flatten(I), [1,0,0, 0,1,0, 0,0,1])
})

Deno.test("matrix: dot", () => {
  let aat = M.dot(a, at)
  T.eq(aat, [[5,11], [11,25]])
})

Deno.test("matrix: inv", () => {
  let b = M.inv(a)
  let ab = M.dot(a, b)
  T.assert(V.near(R.flatten(ab), [1,0, 0,1]))
})

Deno.test("matrix: det", () => {
  let d = M.det(a)
  T.assert(T.isNear(d, -2))
})

Deno.test("matrix: conv", () => {
  const m = [
    [1, 2, 3, 4, 5, 6, 7, 8, 9],
    [1, 2, 3, 4, 5, 6, 7, 8, 9],
    [1, 2, 3, 4, 5, 6, 7, 8, 9],
    [1, 2, 3, 4, 5, 6, 7, 8, 9],
    [1, 2, 3, 4, 5, 6, 7, 8, 9],
    [1, 2, 3, 4, 5, 6, 7, 8, 9],
    [1, 2, 3, 4, 5, 6, 7, 8, 9],
    [1, 2, 3, 4, 5, 6, 7, 8, 9],
    [1, 2, 3, 4, 5, 6, 7, 8, 9],
  ]
  const k = [
    [1,1,1],
    [1,1,1],
    [1,1,1],
  ]
  let c = M.conv(k, m)
  // console.log('conv:c=', c)
  T.eq(c, [
    [6,12,18,24,30,36,42,48,34],
    [9,18,27,36,45,54,63,72,51],
    [9,18,27,36,45,54,63,72,51],
    [9,18,27,36,45,54,63,72,51],
    [9,18,27,36,45,54,63,72,51],
    [9,18,27,36,45,54,63,72,51],
    [9,18,27,36,45,54,63,72,51],
    [9,18,27,36,45,54,63,72,51],
    [6,12,18,24,30,36,42,48,34]
  ])
})

Deno.test("matrix: LU", () => {
  let lup = M.lu(a)
  // console.log('lup=', lup)
  T.assert(V.near(R.flatten(lup.LU), [3, 4, 0.3333, 0.6667]))
  let b = [17, 39]
  let x = [5, 6]
  let s = M.luSolve(lup, b)
  // console.log('s=', s)
  T.assert(V.near(s, x))
})


Deno.test("matrix: SVD", () => {
  let svd = M.svd(a)
  // console.log('svd=', svd)
  let Ut = M.transpose(svd.U)
  let Vt = M.transpose(svd.V)
  let UtU = M.dot(Ut, svd.U)
  let VVt = M.dot(svd.V, Vt)
  // console.log('UtU=', UtU)
  // console.log('VVt=', VVt)
  T.assert(V.near(R.flatten(UtU), R.flatten(M.identity(svd.U.length))))
  T.assert(V.near(R.flatten(VVt), R.flatten(M.identity(svd.V.length))))
  let US = M.dot(svd.U, M.diag(svd.S))
  let USVt = M.dot(US, Vt)
  // console.log('USV=', USVt)
  T.assert(V.near(R.flatten(USVt), R.flatten(a)))
})
