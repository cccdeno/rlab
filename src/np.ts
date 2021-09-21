import { Tensor } from './tensor.ts'

export function zeros(shape:number[]) {
    return new Tensor(shape)
}

export function randn(shape:number[]) {
    let t = new Tensor(shape)
    return t.map1((x)=>Math.random())
}

export function shuffle(shape:number[]) {

}

export function max(t1:Tensor, t2:Tensor) {
    return t1.map2(t2, (a,b)=>Math.max(a,b))
}

export function min(t1:Tensor, t2:Tensor) {
    return t1.map2(t2, (a,b)=>Math.min(a,b))
}

export function tensor(a:any) {
    return Tensor.fromArray(a)
}
 
export function dot(t1:Tensor, t2:Tensor) {
    return t1.dot(t2)
}


