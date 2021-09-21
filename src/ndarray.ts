import * as A from './array.ts'
import * as V from './vector.ts'

export function dim(shape: number[]) {
    return shape.length
}

export function size(shape: number[]) {
    return V.product(shape)
}

export function offset(shape:number[], idx: number[]) {
    let dim = shape.length
    let offset = idx[0]
    for (let i = 1; i < dim; i++) {
        offset = offset * shape[i] + idx[i]
    }
    return offset
}

export function toArray(shape:number[], v:any[]) {
    var r
    switch (dim(shape)) {
      case 1:
        r = v.slice(0)
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
        throw Error(`toArray() do not support dimension>3, dim=${dim(shape)}!`)
    }
    return r
}

export function ndarray(shape:number[], v?:any) {
    let len = size(shape)
    if (v == null) v = A.array(len)
    return toArray(shape, v)
}

export function toShape(a:any, shape:number[]) {
    if (Array.isArray(a)) {
        shape.push(a.length)
        toShape(a[0], shape)
    }
}

export function getShape(a:any) {
    let shape:number[] = []
    toShape(a, shape)
    return shape
}

export function fromArray(a:any, r:any[]) {
    if (Array.isArray(a)) {
        let len = a.length
        for (let i=0; i<len; i++) {
            fromArray(a[i], r)
        }
    } else {
        r.push(a)
    }
}

export function flatten(a: any) {
    let r:any[] = []
    fromArray(a, r)
    return r
}

export function ndisti(shape:number[], v:number[], axis:number, si:number, r:number[][], idx:number[]) {
    // console.log('idx=', idx)
    if (idx.length == shape.length) {
        r[idx[axis]].push(v[offset(shape, idx)])
    }
    for (let i=0; i<shape[si]; i++) {
        idx.push(i)
        ndisti(shape, v, axis, si+1, r, idx)
        idx.pop()
    }
}

export function ndist(shape:number[], v:number[], axis:number) {
    let r = A.repeats(shape[axis], ()=>[])
    let idx:number[] = []
    ndisti(shape, v, axis, 0, r, idx)
    console.log('r=', r)
    return r
}


// ============== map/reduce ====================
export function map1(a: any, f: (x: any) => any) {
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

export function map2(a: any, b: any, f: (x: any, y: any) => any) {
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

export function reduce(a: any, f: any, init: (x: any) => any) {
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

// ================ map to ...=================
export function toNumber(a:any) {
    return map1(a, (o)=>parseFloat(o))
}
