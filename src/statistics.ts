// import * as U from './util.ts'
import * as L from '/lib6/mod.ts'
// import * as A from './array.ts'
import * as V from './vector.ts'
// import * as D from './distribution.ts'

export function probChoose(x: any[], prob: number[]) {
  let xlen = x.length
  let p = L.random()
  let psum = 0
  for (var pi = 0; pi < xlen; pi++) {
    psum += prob[pi]
    if (psum >= p) break
  }
  return pi
}

export function samples(x: any[], size: number, replace: boolean = false, prob: number[] | null = null) {
  if (replace && size>x.length) throw Error(`samples():should be size<x.length, but (size=${size})>(x.length=${x.length})`)
  let slots = x.slice(0)
  let xlen = x.length
  let p = (prob==null) ? V.vector(xlen, 1.0/xlen) : prob.slice(0)
  let rlist = new Array(size)
  for (let i=0; i<size; i++) {
    let xi = probChoose(slots, p)
    rlist[i] = x[xi]
    if (replace) {
      p[xi] = 0
      V.normalize(p)  
    }
  }
  return rlist
}

const EPSILON = 0.00000001

export function histogram(a: number[], from: number = Math.floor(V.min(a)), to: number = Math.ceil(V.max(a)), step: number = 1) {
  var n = Math.ceil((to - from + EPSILON) / step)
  var xc = L.range(from + step / 2.0, to, step)
  // var n = xc.length
  var bins = V.vector(n, 0)
  let len = a.length
  for (let i = 0; i < len; i++) {
    var slot = Math.floor((a[i] - from) / step)
    if (slot >= 0 && slot < n) {
      bins[slot]++
    }
  }
  return { type: 'histogram', xc: xc, bins: bins, from: from, to: to, step: step }
}
