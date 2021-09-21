import {np} from '../mod.ts'

var axis
// a = np.array([[1, 2], [3, 4]])
let a = np.tensor([[[0, 1], [2, 3]], [[4,5],[6,7]]])
console.log(a.sum(axis = 0).toArray())
console.log(a.sum(axis = 1).toArray())
