import numpy as np

# a = np.array([[1, 2], [3, 4]])
# a = np.array([[[1, 2], [3, 4]], [[5,6],[7,8]]])
a = np.array([[[0, 1], [2, 3]], [[4,5],[6,7]]])
print(a.sum(axis = 1))
print(a.sum(axis = 0))
