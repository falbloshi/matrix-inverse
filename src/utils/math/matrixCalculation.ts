/*
The Gauss Elemination Algorithm

First find the pivot, which is usually the first column of the first row, second column of the second row

If it is not 1, divide or multiply the Row to get it to one. If it is 0, swap it with any other column.

Then use that row to eleminate the first column from all elements until they are 0, using elementary operations like multiplications in cases of rationals, or subtraction for positive numbers and addition for negative numbers, including the scaling factor for multiplication.

To determine the scaling factor, you must take the number to eleminate and divide it with the pivot. 

Now head to the next pivot aka (r2c2] ) do the steps above.


*/

import createMatrixElement from "./createMatrixElement"
import stringToMatrixElements from "../stringToMatrixElements"
import matrixElementToString from "../matrixElementsToString"
import { Rational, Matrix, Matrices, Snapshot } from "../types"
import reduceMatrix from "./rowOperations"

function createIdentityMatrix(size: number) {
  const SIZE = Math.sqrt(size)
  const matrix: Matrix = Array.from({ length: SIZE }, () =>
    Array(SIZE).fill(createMatrixElement(0))
  )

  for (let i = 0; i < SIZE; i++) {
    matrix[i][i] = createMatrixElement(1)
  }
  return matrix
}

function createMatrixFromInput(list: Rational[]) {
  const SIZE = Math.sqrt(list.length)
  const matrix: Matrix = Array.from({ length: SIZE }, () =>
    Array(SIZE).fill(createMatrixElement(0))
  )

  let counter = 0
  for (let i = 0; i < SIZE; i++) {
    for (let j = 0; j < SIZE; j++) {
      matrix[i][j] = list[counter]
      counter++
    }
  }
  return matrix
}

const gaussElimination = (inputMatrices: Matrices): Snapshot[] | boolean => {
  let Steps: Snapshot[] = [
    {
      invMatrix: matrixElementToString(inputMatrices.invMatrix),
      idMatrix: matrixElementToString(inputMatrices.idMatrix),
      rowOps: null,
    },
  ]

  let updatedMatrices: Matrices = inputMatrices

  let invertible: boolean = true

  for (let rowCol = 0; rowCol < updatedMatrices.invMatrix.length; rowCol++) {
    if (rowCol === 0 && invertible) {
      ;[updatedMatrices, Steps, invertible] = reduceMatrix(
        rowCol,
        rowCol,
        updatedMatrices,
        "top-down",
        Steps,
        invertible
      )
    } else if (rowCol === updatedMatrices.invMatrix.length - 1 && invertible) {
      ;[updatedMatrices, Steps, invertible] = reduceMatrix(
        rowCol,
        rowCol,
        updatedMatrices,
        "bottom-up",
        Steps,
        invertible
      )
    } else if (
      rowCol > 0 &&
      rowCol < inputMatrices.invMatrix.length - 1 &&
      invertible
    ) {
      console.log("middle")
      ;[updatedMatrices, Steps, invertible] = reduceMatrix(
        rowCol,
        rowCol,
        updatedMatrices,
        "top-down",
        Steps,
        invertible
      )
      ;[updatedMatrices, Steps] = reduceMatrix(
        rowCol,
        rowCol,
        updatedMatrices,
        "bottom-up",
        Steps,
        invertible
      )
    }
  }

  if (!invertible) return invertible
  return Steps
}

const ls: string[] = ["0", "2", "1", "4"]
const numls: Rational[] = stringToMatrixElements(ls)

const identityMatrix = createIdentityMatrix(numls.length)
const inputMatrix = createMatrixFromInput(numls)

console.log(
  gaussElimination({ invMatrix: inputMatrix, idMatrix: identityMatrix })
)
