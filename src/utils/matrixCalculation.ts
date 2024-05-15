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
