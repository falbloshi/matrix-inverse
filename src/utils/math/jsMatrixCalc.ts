import stringToMatrixElements from "../stringToMatrixElements"
import { Matrix } from "../types"
import createMatrixFromInput from "./matrixCalculation"

let matrix1 = createMatrixFromInput(
  stringToMatrixElements(["2", "3", "4", "5"])
)
let matrix2 = createMatrixFromInput(
  stringToMatrixElements(["3", "2", "1", "4"])
)

let result: any

for (let i = 0; i < matrix1.length; i++) {
  let rowOf1
}
