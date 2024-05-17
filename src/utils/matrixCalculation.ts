/*
The Gauss Elemination Algorithm

First find the pivot, which is usually the first column of the first row, second column of the second row

If it is not 1, divide or multiply the Row to get it to one. If it is 0, swap it with any other column. 

Then use that row to eleminate the first column from all elements until they are 0, using elementary operations like multiplications in cases of fractions, or subtraction for positive numbers and addition for negative numbers, including the scaling factor for multiplication.

To determine the scaling factor, you must take the number to eleminate and divide it with the pivot. 

Now head to the next pivot aka (r2c2] ) do the steps above.

We can check for 


*/

import createMatrixElement from "./createMatrixElement"
import stringToMatrixElements from "./stringToMatrixElements"
import { Fraction } from "./types"

const size: number = 4

const ls: string[] = ["1", "4", "5", "7"]

const numls: Fraction[] = stringToMatrixElements(ls)

function createIdentityMatrix(size: number) {
  const SIZE = Math.sqrt(size)
  const matrix: Fraction[][] = Array.from({ length: SIZE }, () =>
    Array(SIZE).fill(createMatrixElement(0))
  )

  // const STEP = SIZE + 1
  for (let i = 0; i < SIZE; i++) {
    matrix[i][i] = createMatrixElement(1)
  }

  return matrix
}

function createMatrixFromInput(list: Fraction[]) {
  const size = list.length
  const SIZE = Math.sqrt(size)
  const matrix: Fraction[][] = Array.from({ length: SIZE }, () =>
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

console.log(createIdentityMatrix(size))
console.log(createMatrixFromInput(numls))
