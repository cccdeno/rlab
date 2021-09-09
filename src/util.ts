export const Pi = Math.PI
export const E = Math.E
export const Epsilon = 2.220446049250313e-16

export function range(begin:number, end:number, step:number=1) {
  let len = Math.floor((end-begin)/step)
  let a = new Array(len)
  let i = 0
  for (let t=begin; t<end; t+=step) {
    a[i++] = t
  }
  return a
}

export let steps = range

export function near(a:number,b:number,delta:number=0.001) {
  return (Math.abs(a-b) < delta)
}

export function clone(o:any) {
  if (null == o || "object" != typeof o) return o
  if (o.constructor != Object && o.clone != null) return o.clone()
  let r = JSON.parse(JSON.stringify(o)) // 這只會複製非函數欄位！
  if (o.constructor == Object) { // 複製非類別的函數
    for (var attr in o) {
      if (typeof o[attr] === 'function' && o.hasOwnProperty(attr)) r[attr] = o[attr]
    }
  }
  return r
}

export function int(x:number):boolean {
  return Number.isInteger(x)
}

export function be(cond:boolean, ...args:any) {
  if (!cond) {
    throw Error(args.toString())
  }
}

export function random(min: number = 0, max: number = 1) {
  return min + Math.random() * (max - min)
}

export function randomInt(min: number, max: number) {
  return Math.floor(random(min, max))
}

export function randomChoose(a: any[]) {
  return a[randomInt(0, a.length)]
}

// ================== Map Reduce =========================
export function map1(a:any, f:(x:any)=>any) {
  if (a instanceof Array) {
    var fa = new Array(a.length)
    for (var i = 0; i < a.length; i++) {
      fa[i] = map1(a[i], f)
    }
    return fa
  } else {
    return f(a)
  }
}

export function map2(a:any, b:any, f:(x:any, y:any)=>any) {
  if (a instanceof Array) {
    var fa = new Array(a.length)
    var isArrayB = (b instanceof Array)
    for (var i = 0; i < a.length; i++) {
      var bi = isArrayB ? b[i] : b
      fa[i] = map2(a[i], bi, f)
    }
    return fa
  } else {
    return f(a, b)
  }
}

export function reduce(a:any, f:any, init:(x:any)=>any) {
  var result = init
  if (a instanceof Array) {
    for (var i in a) {
      result = f(result, reduce(a[i], f, init))
    }
  } else {
    result = f(result, a)
  }
  return result
}
