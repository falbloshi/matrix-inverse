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
import { Rational, Matrix, Matrices } from "../types"
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

const gaussElimination = (inputMatrices: Matrices): Matrix | any => {
  const Steps: String[] = []

  let updatedMatrices: Matrices = inputMatrices

  let invertible = true

  console.log(inputMatrices.invMatrix, inputMatrices.idMatrix)

  for (let rowCol = 0; rowCol < updatedMatrices.invMatrix.length; rowCol++) {
    if (rowCol === 0) {
      console.log("start")

      updatedMatrices = reduceMatrix(
        rowCol,
        rowCol,
        updatedMatrices,
        "top-down",
        invertible
      )
      console.log(updatedMatrices.invMatrix, updatedMatrices.idMatrix)
    } else if (rowCol === updatedMatrices.invMatrix.length - 1) {
      console.log("end")
      updatedMatrices = reduceMatrix(
        rowCol,
        rowCol,
        updatedMatrices,
        "bottom-up",
        invertible
      )
      console.log(updatedMatrices.invMatrix, updatedMatrices.idMatrix)
    } else if (rowCol > 0 && rowCol < inputMatrices.invMatrix.length - 1) {
      console.log("middle")

      updatedMatrices = reduceMatrix(
        rowCol,
        rowCol,
        updatedMatrices,
        "top-down",
        invertible
      )
      updatedMatrices = reduceMatrix(
        rowCol,
        rowCol,
        updatedMatrices,
        "bottom-up",
        invertible
      )
    }
  }

  // console.log(
  //   "after full row operations",
  //   updatedMatrices.invMatrix,
  //   updatedMatrices.idMatrix
  // )

  //testing area
  // console.log(inputMatrices.invMatrix, inputMatrices.idMatrix)

  // let result = reduceMatrix(0, 0, inputMatrices, "top-down", true)
  // if (result) {
  //   console.log(
  //     "result after first topdown reduction from first pivot",
  //     result.invMatrix,
  //     result.idMatrix
  //   )
  // }

  return null
}

const ls: string[] = ["3", "2", "5", "4"]
const numls: Rational[] = stringToMatrixElements(ls)

const identityMatrix = createIdentityMatrix(numls.length)
const inputMatrix = createMatrixFromInput(numls)

gaussElimination({ invMatrix: inputMatrix, idMatrix: identityMatrix })
