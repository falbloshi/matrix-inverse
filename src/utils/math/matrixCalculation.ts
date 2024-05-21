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

const gaussElimination = (
  inputMatrix: Matrix,
  identityMatrix: Matrix
): Matrix | any => {
  const Steps = []
  let invMatrix = inputMatrix
  let idMatrix = identityMatrix

  let PIVOT: Rational | "row swap"
  let invertible = true

  type rowOperations =
    | "find pivot"
    | "row swap"
    | "reduce columns"
    | "check row for zeros"
    | "find scaling factor"

  //returns input if non zero, otherwise null
  const checkForNonZero = (input: Rational): Rational | null => {
    if (input.num !== 0) return input
    return null
  }

  //if returns null, do a row swap
  const findPivot = (currentCol: number, row: Rational[]): Rational | null => {
    return checkForNonZero(row[currentCol])
  }

  // if returns true, end gaussian and turn invertible into false
  const checkRowsForZero = (row: Rational[]): boolean => {
    return row.some((item) => checkForNonZero(item) !== null)
  }

  //row swap if current pivot is zero
  const rowSwap = (row: number, col: number) => {
    const currentRow = invMatrix[row]
    let newRow: Rational[]
    let temp: Rational[]
    for (let i = row; i < invMatrix.length; i++) {
      const isNonZero = checkForNonZero(invMatrix[i][col])
      if (isNonZero) {
        newRow = invMatrix[i]
        invMatrix[i] = currentRow
        invMatrix[row] = newRow
        //also swap id matrix
        temp = idMatrix[i]
        idMatrix[i] = idMatrix[row]
        idMatrix[row] = temp
        return
      }
      invertible = false
    }
  }

  let col = 0

  console.log(invMatrix)
  rowSwap(0, 0)
  console.log(invMatrix, idMatrix)

  const isPivot = findPivot(col, invMatrix[col])

  PIVOT = isPivot !== null ? isPivot : "row swap"

  return null
}

const size: number = 4

const ls: string[] = ["0", "4/3", "5", "7"]
const numls: Rational[] = stringToMatrixElements(ls)

const identityMatrix = createIdentityMatrix(size)
const inputMatrix = createMatrixFromInput(numls)

// console.log(identityMatrix)
// console.log(inputMatrix)

gaussElimination(inputMatrix, identityMatrix)
