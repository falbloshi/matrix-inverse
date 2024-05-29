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

const createMatrixFromInput = (list: Rational[]) => {
  const SIZE = Math.sqrt(list.length)
  const matrix: Matrix = Array.from({ length: SIZE }, (_, i) =>
    Array.from({ length: SIZE }, (_, j) => list[i * SIZE + j])
  )
  return matrix
}

export default createMatrixFromInput

const gaussElimination = (inputMatrices: Matrices): Array<any> | boolean => {
  let Steps: Snapshot[] | { finalResult: string } = [
    {
      invMatrix: matrixElementToString(inputMatrices.invMatrix),
      idMatrix: matrixElementToString(inputMatrices.idMatrix),
      rowOps: null,
    },
  ]

  let updatedMatrices: Matrices = inputMatrices

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

  if (!invertible) return invertible
  return [...Steps, { final: "yes" }]
}

const ls: string[] = ["1", "2", "3", "4"]
const numls: Rational[] = stringToMatrixElements(ls)

const identityMatrix = createIdentityMatrix(numls.length)
const inputMatrix = createMatrixFromInput(numls)

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

// console.log(
//   gaussElimination({
//     invMatrix: createMatrixFromInput(
//       stringToMatrixElements(["2", "-3", "4", "5"])
//     ),
//     idMatrix: createIdentityMatrix(4),
//   })
// )

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
// console.log(
//   gaussElimination({
//     invMatrix: createMatrixFromInput(
//       stringToMatrixElements([
//         "1/2",
//         "1/3",
//         "1/4",
//         "1/5",
//         "1/6",
//         "1/7",
//         "1/8",
//         "1/9",
//         "1/10",
//       ])
//     ),
//     idMatrix: createIdentityMatrix(9),
//   })
// )
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
