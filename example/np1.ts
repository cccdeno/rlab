import {np} from '../mod.ts'

var axis
// a = np.array([[1, 2], [3, 4]])
let a = np.tensor([[[1, 2], [3, 4]], [[5,6],[7,8]]])
console.log(a.sum(axis = 1))
console.log(a.sum(axis = 0))
