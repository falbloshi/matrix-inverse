import { Snapshot } from "./types"

import augmentedMatrixDisplay from "./augmentedMatrixDisplay"
import resultMatrixDisplay from "./resultMatrixDisplay"

const matrixWithRowOpsDisplay = (matrix: Array<any>): Array<any> | null => {
  if (!matrix) return null
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

  return augmentedResult.concat(finalResult)
}

export default matrixWithRowOpsDisplay
