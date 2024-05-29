import stringToMatrixElements from "../stringToMatrixElements"
import { Matrix } from "../types"
import elementaryOperations from "./elementaryOperations"
import createMatrixFromInput from "./matrixCalculation"

let matrix1 = createMatrixFromInput(
  stringToMatrixElements(["2", "3", "4", "5"])
)
let matrix2 = createMatrixFromInput(
  stringToMatrixElements(["3", "2", "1", "4"])
)

let transposedMatrix: Matrix

// const transpose = (matrix: Matrix) => {
//   let result: Matrix = []
//   for (let i = 0; i < matrix.length; i++) {
//     for (let j = 0; j < matrix.length; j++) {
//       result[i].push(matrix[j][i])
//     }
//   }
//   return result
// }

const transpose = (matrix: Matrix): Matrix => {
  return matrix[0].map((_, colIndex) => matrix.map((row) => row[colIndex]))
}

transposedMatrix = transpose(matrix2)

//requires a transposed second matrix
const matrixMultiplication = (matrixA: Matrix, matrixB: Matrix) => {

  return matrixA.map((rowA) => matrixB.map((colB, colIndex) => rowA.map((valueA, index) => 
    elementaryOperations("multiply", valueA, colB[index].reduce((sum, product) => elementaryOperations("add", sum, product), {num:0, den:1}))))
  
}

console.log(matrixMultiplication(matrix1, transposedMatrix))
