import  StringToNumbers, { createMatrixElement }from "./stringToNumber"

interface Fraction {
  num: number
  den: number
}

const size: number = 4

const ls: string[] = ["1", "3/2", "-2/2", "4"]

const numls: Fraction[] = StringToNumbers(ls)

console.log(numls)

function createIdentityMatrix(size: number){
  const SIZE = Math.sqrt(size)
  const matrix = Array.from(Array(SIZE*SIZE).fill(createMatrixElement(0)))

  const STEP = SIZE + 1 
  for (let i = 0; i < SIZE*SIZE; i += STEP) {
    matrix[i] = createMatrixElement(1)
  }
  
  return matrix
}


console.log(createIdentityMatrix(size))