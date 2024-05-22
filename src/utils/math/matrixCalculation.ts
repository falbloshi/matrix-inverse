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
import elementaryOperations from "./elementaryOperations"

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
  const Steps: String[] = []
  let invMatrix = inputMatrix
  let idMatrix = identityMatrix
  let updatedMatrices: Matrices

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
  const checkRowsForZero = (currentRow: Rational[]): boolean => {
    return currentRow.some((item) => checkForNonZero(item) !== null)
  }

  //turn pivot to 1 using a row operation (which is usually dividing by itself), then affecting both inverse and id matrices
  const reducePivot = (
    PIVOT: Rational,
    row: number,
    mainMatrices: Matrices
  ): Matrices => {
    if (PIVOT.num === 1) return mainMatrices

    let {idMatrix, invMatrix} = mainMatrices

    let newInvRow = invMatrix[row].map((item) =>
      elementaryOperations("divide", item, PIVOT)
    )
    let newIdRow = invMatrix[row].map((item) =>
      elementaryOperations("divide", item, PIVOT)
    )

    invMatrix[row] = newInvRow
    idMatrix[row] = newIdRow

    //steps for later on
    // const numForShow = PIVOT.num > 1 ? "/" + PIVOT.num : ""
    // Steps.push(`R${row}rarr${PIVOT.den}${numForShow}*R${row}`)

    return {idMatrix, invMatrix}
  }


  const reduceColumns = (
    PIVOT: Rational,
    row: number,
    col: number,
    mainMatrices: Matrices
  ): Matrices | null => {
    //row and col belongs to the pivot

    //first reduce columns below
    let {idMatrix, invMatrix} = mainMatrices
    
    for(let i = row; i < idMatrix.length; i++) {
      const currentNumber = idMatrix[row][col]
      elementaryOperations()
    }
    
    
    

    return null
  }

  //row swap if current pivot is zero
  //if finds no non zeroes, return invertible false and end gaussian
  const rowSwap = (
    row: number,
    col: number,
    invMatrix: Matrix,
    idMatrix: Matrix
  ): Matrices | null => {
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

        return { invMatrix: invMatrix, idMatrix: idMatrix }
      }
    }
    return null
  }

  console.log(invMatrix)
  // for row swap testing
  // const rowSwapResult = rowSwap(0, 0, invMatrix, idMatrix)
  // if (rowSwapResult) {
  //   invMatrix = rowSwapResult.invMatrix
  //   idMatrix = rowSwapResult.idMatrix
  //   console.log(invMatrix, idMatrix)
  // } else {
  //   console.log("Not invertible")
  // }

  const col = 0
  const isPivot = findPivot(col, invMatrix[col])

  PIVOT = isPivot !== null ? isPivot : "row swap"

  updatedMatrices = reducePivot(invMatrix[1][1], 1, {
    invMatrix: invMatrix,
    idMatrix: idMatrix,
  })

  return null
}

const size: number = 9

const ls: string[] = ["-4", "4/3", "5", "2", "2/3", "2", "9", "4", "5"]
const numls: Rational[] = stringToMatrixElements(ls)

const identityMatrix = createIdentityMatrix(size)
const inputMatrix = createMatrixFromInput(numls)

// console.log(identityMatrix)
// console.log(inputMatrix)

gaussElimination(inputMatrix, identityMatrix)
