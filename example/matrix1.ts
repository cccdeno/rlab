import {M} from '../mod.ts'

let a = [[1,2],[3,4]]
let at = M.transpose(a)

console.log('a=', a)
console.log('at=', at)
console.log('dot(a, at)=', M.dot(a, at))
