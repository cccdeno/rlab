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

export function be(cond:boolean, ...args:any) {
  if (!cond) {
    throw Error(args.toString())
  }
}
