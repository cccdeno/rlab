import * as ND from './ndarray.ts'
import * as V from './vector.ts'
import * as U from './util.ts'
import * as M from './matrix.ts'

function op1(t1: Tensor, op: string) {
  let V1 = V as { [index: string]: any }
  let rv = V1[op](t1.v)
  return new Tensor(t1.shape, rv)
}

function op1n(t1: Tensor, op: string, axis?:number) {
  let V1 = V as { [index: string]: any }
  if (axis == null) {
    let r = V1[op](t1.v)
    return r  
  } else {
    let d = ND.ncollapse(t1.shape, t1.v, axis)
    let len = d.length
    let r = new Array(len)
    for (let i=0; i<len; i++) {
      r[i] = V1[op](d[i])
    }
    let cshape = t1.shape.slice(0)
    cshape.splice(axis, 1)
    return new Tensor(cshape, r)
  }
}

function op2(t1: Tensor, op: string, t2: Tensor) {
  let V2 = V as { [index: string]: any }
  U.be(V.eq(t1.shape, t2.shape))
  let rv = V2[op](t1.v, t2.v)
  return new Tensor(t1.shape, rv)
}

function op2n(t1: Tensor, op: string, t2: Tensor) {
  let V2 = V as { [index: string]: any }
  U.be(V.eq(t1.shape, t2.shape))
  let r = V2[op](t1.v, t2.v)
  return r
}

export class Tensor {
  shape: number[]
  v: number[]

  constructor(shape: number[], v?: number[]) {
    this.shape = [...shape]
    this.v = v ? v : V.vector(V.product(shape), 0)
  }

  dim() { return ND.dim(this.shape) }

  map1(f: (a: any) => any) {
    return new Tensor(this.shape, U.map1(this.v, f))
  }

  map2(t2: Tensor, f: (a: any, b: any) => any) {
    return new Tensor(this.shape, U.map2(this.v, t2.v, f))
  }
  // vector = this.op(t2)
  add(t2: Tensor) { return op2(this, "add", t2); }
  sub(t2: Tensor) { return op2(this, "sub", t2); }
  mul(t2: Tensor) { return op2(this, "mul", t2); }
  div(t2: Tensor) { return op2(this, "div", t2); }
  mod(t2: Tensor) { return op2(this, "mod", t2); }
  pow(t2: Tensor) { return op2(this, "pow", t2); }
  and(t2: Tensor) { return op2(this, "and", t2); }
  or(t2: Tensor) { return op2(this, "or", t2); }
  xor(t2: Tensor) { return op2(this, "xor", t2); }
  band(t2: Tensor) { return op2(this, "band", t2); }
  bor(t2: Tensor) { return op2(this, "bor", t2); }
  bxor(t2: Tensor) { return op2(this, "bxor", t2); }
  eq(t2: Tensor) { return op2(this, "eq", t2); }
  neq(t2: Tensor) { return op2(this, "neq", t2); }
  lt(t2: Tensor) { return op2(this, "lt", t2); }
  gt(t2: Tensor) { return op2(this, "gt", t2); }
  leq(t2: Tensor) { return op2(this, "leq", t2); }
  geq(t2: Tensor) { return op2(this, "geq", t2); }

  // vector = this.op()
  neg() { return op1(this, "neg"); }
  abs() { return op1(this, "abs"); }
  log() { return op1(this, "log"); }
  not() { return op1(this, "not"); }
  sin() { return op1(this, "sin"); }
  cos() { return op1(this, "cos"); }
  tan() { return op1(this, "tan"); }
  cot() { return op1(this, "cot"); }
  sec() { return op1(this, "sec"); }
  csc() { return op1(this, "csc"); }
  asin() { return op1(this, "asin"); }
  acos() { return op1(this, "acos"); }
  atan() { return op1(this, "atan"); }
  atan2() { return op1(this, "atan2"); }
  atanh() { return op1(this, "atanh"); }
  cbrt() { return op1(this, "cbrt"); }
  ceil() { return op1(this, "ceil"); }
  clz32() { return op1(this, "clz32"); }
  cosh() { return op1(this, "cosh"); }
  exp() { return op1(this, "exp"); }
  expm1() { return op1(this, "expm1"); }
  floor() { return op1(this, "floor"); }
  fround() { return op1(this, "fround"); }
  hypot() { return op1(this, "hypot"); }
  log10() { return op1(this, "log10"); }
  log1p() { return op1(this, "log1p"); }
  log2() { return op1(this, "log2"); }
  round() { return op1(this, "round"); }
  sign() { return op1(this, "sign"); }
  sqrt() { return op1(this, "sqrt"); }
  trunc() { return op1(this, "trunc"); }
  random() { return op1(this, "random"); }

  // number = this.op()
  min(axis?:number) { return op1n(this, "min", axis); }
  max(axis?:number) { return op1n(this, "max", axis); }
  any(axis?:number) { return op1n(this, "any", axis); }
  all(axis?:number) { return op1n(this, "all", axis); }
  sum(axis?:number) { return op1n(this, "sum", axis); }
  product(axis?:number) { return op1n(this, "product", axis); }
  norm(axis?:number) { return op1n(this, "norm", axis); }
  norminf(axis?:number) { return op1n(this, "norminf", axis); }
  mean(axis?:number) { return op1n(this, "mean", axis); }
  sd(axis?:number) { return op1n(this, "sd", axis); }
  normalize(axis?:number) { return op1n(this, "normalize", axis); }
  normalize2(axis?:number) { return op1n(this, "normalize2", axis); }

  // number = this.op2(t2)
  near(t2: Tensor) { return op2n(this, "near", t2); }

  offset(idx: number[]) { return ND.offset(this.shape, idx) }

  get(idx: number[]) {
    let j = this.offset(idx)
    return this.v[j]
  }

  set(idx: number[], x: number) {
    let j = this.offset(idx)
    this.v[j] = x
  }

  toVector() { return this.v }

  toArray() { return ND.toArray(this.shape, this.v) }

  static fromArray(array: any[]) {
    let v = ND.flatten(array)
    let shape = ND.getShape(array)
    return new Tensor(shape, v)
  }

  // matrix
  dot(t2:Tensor) {
    V.eq(this.shape, t2.shape, `this.dot(t2) should have the same shape, but this=${this}, t2=${t2}`)
    switch (this.dim()) {
      case 1:
        let v = V.dot(this.v, t2.v)
        return new Tensor([1], [v])
      case 2:
        let m1 = this.toArray(), m2 = t2.toArray()
        let m = M.dot(m1, m2)
        return Tensor.fromArray(m)
      default:
        throw Error(`dot do not support dim=${this.dim()}`)
    }
  }
}
