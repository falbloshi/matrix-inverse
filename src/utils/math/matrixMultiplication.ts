import { Matrix } from "../types"
import elementaryOperations from "./elementaryOperations"

const matrixMultiplication = (matrixA: Matrix, matrixB: Matrix) => {
  const transposedMatrixB = matrixB[0].map((_, colIndex) =>
    matrixB.map((row) => row[colIndex])
  )

  return matrixA.map((rowA) => {
    return transposedMatrixB.map((colB) => {
      return rowA
        .map((valueA, index) =>
          elementaryOperations("multiply", valueA, colB[index])
        )
        .reduce((sum, product) => elementaryOperations("add", sum, product), {
          num: 0,
          den: 1,
        })
    })
  })
}

export default matrixMultiplication
