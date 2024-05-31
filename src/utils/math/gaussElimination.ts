/*
The Gauss Elemination Algorithm

First find the pivot, which is usually the first column of the first row, second column of the second row

If it is not 1, divide or multiply the Row to get it to one. If it is 0, swap it with any other column.

Then use that row to eleminate the first column from all elements until they are 0, using elementary operations like multiplications in cases of rationals, or subtraction for positive numbers and addition for negative numbers, including the scaling factor for multiplication.

To determine the scaling factor, you must take the number to eleminate and divide it with the pivot. 

Now head to the next pivot aka (r2c2] ) do the steps above.


*/

import stringToMatrixElements from "../stringToMatrixElements"
import matrixElementToString from "../matrixElementsToString"
import { Rational, Matrix, Matrices, Snapshot } from "../types"
import reduceMatrix from "./rowOperations"
import matrixMultiplication from "./matrixMultiplication"

const createMatrixElement = (num: number, den: number = 1): Rational => ({
  num,
  den,
})

const createIdentityMatrix = (size: number) => {
  const SIZE = Math.sqrt(size)
  const matrix: Matrix = Array.from({ length: SIZE }, () =>
    Array(SIZE).fill(createMatrixElement(0))
  )

  for (let i = 0; i < SIZE; i++) {
    matrix[i][i] = createMatrixElement(1)
  }
  return matrix
}

const deepCopyMatrix = (matrix: Matrix): Matrix =>
  matrix.map((row) => row.map((element) => ({ ...element })))

const createMatrixFromInput = (list: Rational[]) => {
  const SIZE = Math.sqrt(list.length)
  const matrix: Matrix = Array.from({ length: SIZE }, (_, i) =>
    Array.from({ length: SIZE }, (_, j) => list[i * SIZE + j])
  )
  return matrix
}

const gaussElimination = (inputMatrix: string[]): Array<any> | null => {
  const originalMatrix = createMatrixFromInput(
    stringToMatrixElements(inputMatrix)
  )
  const invMatrix = deepCopyMatrix(originalMatrix)
  const idMatrix = createIdentityMatrix(inputMatrix.length)

  let Steps: Snapshot[] = [
    {
      invMatrix: matrixElementToString(invMatrix),
      idMatrix: matrixElementToString(idMatrix),
      rowOps: null,
    },
  ]

  let updatedMatrices: Matrices = {
    invMatrix: invMatrix,
    idMatrix: idMatrix,
  }

  let invertible: boolean = true

  for (let rowCol = 0; rowCol < updatedMatrices.invMatrix.length; rowCol++) {
    if (invertible) {
      ;[updatedMatrices, Steps, invertible] = reduceMatrix(
        rowCol,
        rowCol,
        updatedMatrices,
        Steps,
        invertible
      )
    }
  }

  const matrixMultiplicationResult = matrixElementToString(
    matrixMultiplication(originalMatrix, idMatrix)
  )

  if (!invertible) return null
  return [
    ...Steps,
    {
      originalMatrix: matrixElementToString(originalMatrix),
      updatedIdMatrix: matrixElementToString(idMatrix),
      result: matrixMultiplicationResult,
      rowOps: "A * A^-1 = I",
    },
  ]
}
//2x2
// console.log(
//   gaussElimination({
//     invMatrix: createMatrixFromInput(
//       stringToMatrixElements(["1", "2", "3", "4"])
//     ),
//     idMatrix: createIdentityMatrix(4),
//   })
// )
// console.log(
//   gaussElimination({
//     invMatrix: createMatrixFromInput(
//       stringToMatrixElements(["1/2", "3/4", "5/6", "7/8"])
//     ),
//     idMatrix: createIdentityMatrix(4),
//   })
// )

// let matrix1 = createMatrixFromInput(
//   stringToMatrixElements(["-14/3", "4", "40/9", "-8/3"])
// )
// let matrix2 = createMatrixFromInput(
//   stringToMatrixElements(["1/2", "3/4", "5/6", "7/8"])
// )

// console.log(gaussElimination(["2", "-3", "4", "5"]))

//3x3
// console.log(
//   //false matrix
//   gaussElimination({
//     invMatrix: createMatrixFromInput(
//       stringToMatrixElements(["1", "2", "3", "4", "5", "6", "7", "8", "9"])
//     ),
//     idMatrix: createIdentityMatrix(9),
//   })
// )
console.log(
  gaussElimination([
    "1/2",
    "1/3",
    "1/4",
    "1/5",
    "1/6",
    "1/7",
    "1/8",
    "1/9",
    "1/10",
  ])
)

// console.log(
//   gaussElimination({
//     invMatrix: createMatrixFromInput(
//       stringToMatrixElements([
//         "2/3",
//         "-1",
//         "4/5",
//         "-2",
//         "3/4",
//         "1/2",
//         "7/8",
//         "5/6",
//         "-1/3",
//       ])
//     ),
//     idMatrix: createIdentityMatrix(9),
//   })
// )

// console.log(
//   gaussElimination({
//     invMatrix: createMatrixFromInput(
//       stringToMatrixElements([
//         "2",
//         "-1",
//         "0",
//         "3",
//         "1",
//         "2",
//         "4",
//         "-2",
//         "3",
//         "-2",
//         "1",
//         "0",
//         "4",
//         "1",
//         "-3",
//         "2",
//       ])
//     ),
//     idMatrix: createIdentityMatrix(16),
//   })
// )
// console.log(
//   gaussElimination({
//     invMatrix: createMatrixFromInput(
//       stringToMatrixElements([
//         "3/2",
//         "2/3",
//         "-1/4",
//         "5/6",
//         "-2/3",
//         "4/5",
//         "1/2",
//         "-3/4",
//         "1/3",
//         "-5/6",
//         "2/7",
//         "3/8",
//         "-1/2",
//         "2/3",
//         "-3/4",
//         "1/5",
//       ])
//     ),
//     idMatrix: createIdentityMatrix(16),
//   })
// )
