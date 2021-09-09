import * as R from 'https://deno.land/x/rlab/mod.ts'
const { M } = R

let a = [[1,2],[3,4]]
let at = M.transpose(a)

console.log('a=', a)
console.log('at=', at)
console.log('M.dot(a, at)=', M.dot(a, at))
