import * as R from './random.ts'

export function vector(n:number, value:number=0) {
  let a = new Array(n)
  return a.fill(value)
}

export function near(a:number[], b:number[], delta=0.001) {
  if (a.length != b.length) return false
  let len = a.length
  for (var i = 0; i < len; i++) {
    if (Math.abs(a[i]-b[i]) > delta) return false
  }
  return true
}

export function op2(op:string) { // 這個函數強調速度，所以會比較長 ...
  let text = `
  var ai, bi, i, c
  let aA = Array.isArray(a)
  let bA = Array.isArray(b)
  let len = a.length || b.length
  if (aA && bA) {
    c = new Array(len)
    for (let i=0; i<len; i++) {
      ai=a[i]
      bi=b[i]
      c[i] = ${op}
    }
    return c
  }
  if (!aA && !bA) { ai=a; bi=b; return ${op} }
  c = new Array(len)
  for (let i=0; i<len; i++) {
    ai=(aA) ? a[i] : a
    bi=(bA) ? b[i] : b
    c[i] = ${op}
  }
  return c
  `
  return new Function('a', 'b', text)
}

export const add = op2('ai+bi')
export const sub = op2('ai-bi')
export const mul = op2('ai*bi')
export const div = op2('ai/bi')
export const mod = op2('ai%bi')
export const pow = op2('Math.pow(ai,bi)')
export const and = op2('ai&&bi')
export const or  = op2('ai||bi')
export const xor = op2('(ai || bi) && !(ai && bi)')
export const band= op2('ai&bi')
export const bor = op2('ai|bi')
export const bxor= op2('ai^bi')
export const eq  = op2('ai==bi')
export const neq = op2('ai!=bi')
export const lt  = op2('ai<bi')
export const gt  = op2('ai>bi')
export const leq = op2('ai<=bi')
export const geq = op2('ai>=bi')

// Uniary Operation
export function op1(op:string) {
  let text = `
  var ai
  let aA = Array.isArray(a)
  if (!aA) { ai=a; return ${op} }
  let len = a.length
  let c = new Array(len)
  for (let i=0; i<len; i++) {
    ai=a[i]
    c[i] = ${op}
  }
  return c
  `
  return new Function('a', text)
}

export const neg = op1('-ai')
export const abs = op1('Math.abs(ai)')
export const log = op1('Math.log(ai)')
export const not = op1('!ai')
export const sin = op1('Math.sin(ai)')
export const cos = op1('Math.cos(ai)')
export const tan = op1('Math.tan(ai)')
export const cot = op1('Math.cot(ai)')
export const sec = op1('Math.sec(ai)')
export const csc = op1('Math.csc(ai)')
export const asin= op1('Math.asin(ai)')
export const acos= op1('Math.acos(ai)')
export const atan= op1('Math.atan(ai)')
export const atan2=op1('Math.atan2(ai)')
export const atanh=op1('Math.atanh(ai)')
export const cbrt= op1('Math.cbrt(ai)')
export const ceil= op1('Math.ceil(ai)')
export const clz32=op1('Math.clz32(ai)')
export const cosh= op1('Math.cosh(ai)')
export const exp = op1('Math.exp(ai)')
export const expm1= op1('Math.expm1(ai)')
export const floor= op1('Math.floor(ai)')
export const fround= op1('Math.fround(ai)')
export const hypot= op1('Math.hypot(ai)')
export const imul= op1('Math.imul(ai)')
export const log10= op1('Math.log10(ai)')
export const log1p= op1('Math.log1p(ai)')
export const log2= op1('Math.log2(ai)')
export const round= op1('Math.round(ai)')
export const sign= op1('Math.sign(ai)')
export const sqrt= op1('Math.sqrt(ai)')
export const trunc= op1('Math.trunc(ai)')

// 累積性運算
export const dot = function (a:number[],b:number[]) {
  let len = a.length
  let r = 0
  for (let i=0; i<len; i++) {
    r += a[i] * b[i]
  }
  return r
}

export const min = function (a:number[]) {
  let len = a.length, r = a[0]
  for (let i=1; i<len; i++) {
    if (a[i] < r) r = a[i]
  }
  return r
}

export const max = function (a:number[]) {
  let len = a.length, r = a[0]
  for (let i=1; i<len; i++) {
    if (a[i] > r) r = a[i]
  }
  return r
}

export const any = function (a:number[]) {
  let len = a.length
  for (let i=0; i<len; i++) {
    if (a[i]) return true
  }
  return false
}

export const all = function (a:number[]) {
  let len = a.length
  for (let i=0; i<len; i++) {
    if (!a[i]) return false
  }
  return true
}

export const sum = function(a:number[]) {
  let len = a.length
  let r = 0
  for (let i=0; i<len; i++) {
    r += a[i]
  }
  return r
}

export const product = function(a:number[]) {
  let len = a.length
  let r = 1
  for (let i=0; i<len; i++) {
    r *= a[i]
  }
  return r
}

export const norm = function (a:number[]) {
  let a2 = pow(a, 2)
  return Math.sqrt(sum(a2))
}

export const norminf = function (a:number[]) {
  let len = a.length
  let r = 0
  for (let i=0; i<len; i++) {
    r = Math.max(r, Math.abs(a[i]))
  }
  return r
}

export const mean = function(a:number[]) {
  return sum(a)/a.length
}

export const sd = function (a:number[]) {
  let m = mean(a)
  let diff = sub(a, m)
  let d2 = pow(diff, 2)
  return Math.sqrt(sum(d2)/(a.length-1))
}

export const random = function (r:number[], min:number=0, max:number=1) {
  let len = r.length
  for (let i=0; i<len; i++) {
    r[i] = R.random(min, max)
  }
}

export const normalize = function (r:number[]) {
  let ar = abs(r)
  let s = sum(ar) // 不能用 sum，sum 只適用於機率。
  let len = r.length
  for (let i=0; i<len; i++) {
    r[i] = (s==0) ? 0 : r[i]/s
  }
  return r
}

export const normalize2 = function (r:number[]) {
  let norm2 = norm(r)
  if (norm2 === 0) return r
  let len = r.length
  for (let i=0; i<len; i++) {
    r[i] = r[i]/norm2
  }
  return r
}
