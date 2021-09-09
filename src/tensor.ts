import * as OP from './op.ts'
import * as V from './vector.ts'
import { be } from './util.ts'

function op1(t1:Tensor, op:string) {
  let V1 = V as {[index: string]:any}
  let rv = V1[op](t1.v)
  return new Tensor(t1.shape, rv)  
}

function op1n(t1:Tensor, op:string) {
  let V1 = V as {[index: string]:any}
  let r = V1[op](t1.v)
  return r
}

function op2(t1:Tensor, op:string, t2:Tensor) {
  let V2 = V as {[index: string]:any}
  be(V.eq(t1.shape, t2.shape))
  let rv = V2[op](t1.v, t2.v)
  return new Tensor(t1.shape, rv)  
}

function op2n(t1:Tensor, op:string, t2:Tensor) {
  let V2 = V as {[index: string]:any}
  be(V.eq(t1.shape, t2.shape))
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

  dim() { return this.shape.length }

  map1(f:(a:any)=>any) {
    return new Tensor(this.shape, OP.map1(this.v, f))
  }

  map2(t2: Tensor, f:(a:any,b:any)=>any) {
    return new Tensor(this.shape, OP.map2(this.v, t2.v, f))
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

  // number = this.op()
  min() { return op1n(this, "min"); }
  max() { return op1n(this, "max"); }
  any() { return op1n(this, "any"); }
  all() { return op1n(this, "all"); }
  sum() { return op1n(this, "sum"); }
  product() { return op1n(this, "product"); }
  norm() { return op1n(this, "norm"); }
  norminf() { return op1n(this, "norminf"); }
  mean() { return op1n(this, "mean"); }
  sd() { return op1n(this, "sd"); }
  random() { return op1n(this, "random"); }
  normalize() { return op1n(this, "normalize"); }
  normalize2() { return op1n(this, "normalize2"); }

  // number = this.op2(t2)
  near(t2:Tensor) { return op2n(this, "near", t2); }

  offset(idx: number[]) {
    let shape = this.shape
    let dim = shape.length
    let offset = idx[0]
    for (let i = 1; i < dim; i++) {
      offset = offset * shape[i] + idx[i]
    }
    return offset
  }

  get(idx: number[]) {
    let j = this.offset(idx)
    return this.v[j]
  }

  set(idx: number[], x: number) {
    let j = this.offset(idx)
    this.v[j] = x
  }

  toVector() { return this.v; }

  toArray() {
    let { v, shape } = this
    var r
    switch (this.dim()) {
      case 1:
        r = v
        break
      case 2:
        r = new Array(shape[0])
        for (let i = 0; i < shape[0]; i++) {
          r[i] = v.slice(i * shape[1], (i + 1) * shape[1])
        }
        break
      case 3:
        r = new Array(shape[0])
        for (let i = 0; i < shape[0]; i++) {
          r[i] = new Array(shape[1])
          for (let j = 0; j < shape[1]; j++) {
            let start = ((i * shape[0]) + j) * shape[1]
            let end = ((i * shape[0]) + j + 1) * shape[1]
            r[i][j] = v.slice(start, end)
          }
        }
        break
      default:
        throw Error(`Tensor.toArray() do not support dimension>3, dim=${this.dim()}!`)
    }
    return r
  }
}
