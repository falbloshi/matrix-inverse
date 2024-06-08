import { Snapshot } from "./types"

const myArray = [
  {
    invMatrix: ["2", "1", "4", "-3"],
    idMatrix: ["1", "0", "0", "1"],
    rowOps: null,
  },
  {
    invMatrix: ["1", "1/2", "4", "-3"],
    idMatrix: ["1/2", "0", "0", "1"],
    rowOps: "R1 \\longrightarrow \\frac{1}{2} \\cdot R1",
  },
  {
    invMatrix: ["1", "1/2", "0", "-5"],
    idMatrix: ["1/2", "0", "-2", "1"],
    rowOps: "R2 \\longrightarrow R2 - 4 \\cdot R1",
  },
  {
    invMatrix: ["1", "1/2", "0", "1"],
    idMatrix: ["1/2", "0", "2/5", "-1/5"],
    rowOps: "R2 \\longrightarrow \\frac{1}{5} \\cdot R2",
  },
  {
    invMatrix: ["1", "0", "0", "1"],
    idMatrix: ["3/10", "1/10", "2/5", "-1/5"],
    rowOps: "R1 \\longrightarrow R1 - \\frac{1}{2} \\cdot R2",
  },
  {
    originalMatrix: ["2", "1", "4", "-3"],
    updatedIdMatrix: ["3/10", "1/10", "2/5", "-1/5"],
    result: ["1", "0", "0", "1"],
    rowOps: "A \\cdot A^{-1} = I",
  },
]

import augmentedMatrixDisplay from "./augmentedMatrixDisplay"
import resultMatrixDisplay from "./resultMatrixDisplay"

const matrixWithRowOpsDisplay = (matrix: Array<any>) => {
  const matrixOps: Snapshot[] = matrix.slice(0, -1)
  const {
    originalMatrix,
    updatedIdMatrix,
    result,
    rowOps: rowOp,
  } = matrix[matrix.length - 1]

  const augmentedResult: string[] = matrixOps.map((snap) =>
    augmentedMatrixDisplay(snap.invMatrix, snap.idMatrix, snap.rowOps as string)
  )

  const finalResult: string = resultMatrixDisplay(
    originalMatrix,
    updatedIdMatrix,
    result,
    rowOp
  )

  return augmentedResult + finalResult
}

console.log(matrixWithRowOpsDisplay(myArray))

export default matrixWithRowOpsDisplay
