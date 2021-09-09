# rlab -- A TypeScript Package for Math like R

The source code of math6 derived from the following projects

1. jstat -- https://github.com/jstat/jstat
2. numeric -- https://github.com/sloisel/numeric

## Example

File: matrix1.ts

```js
import { M } from 'https://deno.land/x/math6/mod.ts'

let a = [[1,2],[3,4]]
let at = M.transpose(a)

console.log('a=', a)
console.log('at=', at)
console.log('M.dot(a, at)=', M.dot(a, at))
```

## Run

```
$ deno run matrix1.ts
a= [ [ 1, 2 ], [ 3, 4 ] ]
at= [ [ 1, 3 ], [ 2, 4 ] ]
M.dot(a, at)= [ [ 5, 11 ], [ 11, 25 ] 
```
