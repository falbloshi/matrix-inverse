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
    rowOps: "R1 rarr 1/2 * R1",
  },
  {
    invMatrix: ["1", "1/2", "0", "-5"],
    idMatrix: ["1/2", "0", "-2", "1"],
    rowOps: "R2 rarr R2 - 4 * R1",
  },
  {
    invMatrix: ["1", "1/2", "0", "1"],
    idMatrix: ["1/2", "0", "2/5", "-1/5"],
    rowOps: "R2 rarr 1/5 * R2",
  },
  {
    invMatrix: ["1", "0", "0", "1"],
    idMatrix: ["3/10", "1/10", "2/5", "-1/5"],
    rowOps: "R1 rarr R1 - R2",
  },
  {
    originalMatrix: ["2", "1", "4", "-3"],
    updatedIdMatrix: ["3/10", "1/10", "2/5", "-1/5"],
    result: ["1", "0", "0", "1"],
    rowOps: "A * A^-1 = I",
  },
]
import reduceRationalForDisplay from "./reduceRationalForDisplay"

const augmentedMatrixDisplay = (
  length: number,
  aMatrix: string[],
  idMatrix: string[]
) => {
  const size = Math.sqrt(length)

  const c = "c".repeat(size)

  let result = `\\begin{bmatrix}\n\\begin{array}{${c}|${c}}`
  for (let i = 0; i < size; i++) {
    let row = ""
    for (let j = 0; j < size; j++) {
      let element = reduceRationalForDisplay(input[i * size + j])
      row += element
      if (j < size - 1) {
        row += " & "
      }
    }
    if (i < size - 1) {
      result += row + "\\\\\n"
    } else {
      result += row + "\n\\end{array}\n\\end{bmatrix}"
    }
  }
  return result
}

const matrixWithRowOpsDisplay = (matrix: Array<any>) => {
  const matrixOps: Snapshot[] = matrix.slice(0, -1)
  const result = matrix[matrix.length - 1]

  const firstElementMatrixOps = matrixOps[0]
  const { invMatrix, idMatrix, rowOps } = firstElementMatrixOps

  console.log(invMatrix)
}

matrixWithRowOpsDisplay(myArray)

export default matrixWithRowOpsDisplay
