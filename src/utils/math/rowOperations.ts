import { Rational, Matrix, Matrices, Snapshot, Operation } from "../types"
import elementaryOperations from "./elementaryOperations"
import matrixElementToString from "../matrixElementsToString"

const checkForNonZero = (input: Rational): Rational | null => {
  if (input.num !== 0) return input
  return null
}

// if returns true, end gaussian and turn invertible into false
const checkRowsForZero = (currentRowFromMatrix: Rational[]): boolean => {
  return currentRowFromMatrix.some((item) => checkForNonZero(item) !== null)
}

const scaleRow = (
  matrix: Rational[][],
  currentRow: number,
  reductionNumberInv: Rational
): Rational[] =>
  matrix[currentRow].map((item) =>
    elementaryOperations(
      "multiply",
      { num: Math.abs(reductionNumberInv.num), den: reductionNumberInv.den },
      item
    )
  )

const rowOperation = (
  matrix: Rational[][],
  operation: Operation,
  rowIndex: number,
  scaledRow: Rational[]
): Rational[] =>
  matrix[rowIndex].map((item, index) =>
    elementaryOperations(operation, item, scaledRow[index])
  )

const normalizePivot = (
  invPivot: Rational,
  currentRow: number,
  invMatrix: Matrix,
  idMatrix: Matrix,
  Steps: Snapshot[]
): [Matrix, Matrix, Snapshot[]] => {
  if (invPivot.num === 1 && invPivot.den === 1)
    return [invMatrix, idMatrix, Steps]

  invMatrix[currentRow] = invMatrix[currentRow].map((item) =>
    elementaryOperations("divide", item, invPivot)
  )
  idMatrix[currentRow] = idMatrix[currentRow].map((item) =>
    elementaryOperations("divide", item, invPivot)
  )

  const num = Math.abs(invPivot.num) > 1 ? "/" + invPivot.num : ""
  const den = invPivot.num < 0 ? -invPivot.den : invPivot.den

  Steps.push({
    invMatrix: matrixElementToString(invMatrix),
    idMatrix: matrixElementToString(idMatrix),
    rowOps: `R${currentRow + 1} rarr ${den}${num} * R${currentRow + 1}`,
  })

  return [invMatrix, idMatrix, Steps]
}

const rowSwap = (
  currentRow: number,
  currentCol: number,
  matrices: Matrices,
  Steps: Snapshot[]
): [Matrices, Snapshot[]] | null => {
  let { invMatrix, idMatrix } = matrices
  for (let i = currentRow; i < invMatrix.length; i++) {
    const isNonZero = checkForNonZero(invMatrix[i][currentCol])
    if (isNonZero) {
      ;[invMatrix[i], invMatrix[currentRow]] = [
        invMatrix[currentRow],
        invMatrix[i],
      ]
      ;[idMatrix[i], idMatrix[currentRow]] = [idMatrix[currentRow], idMatrix[i]]

      Steps.push({
        invMatrix: matrixElementToString(invMatrix),
        idMatrix: matrixElementToString(idMatrix),
        rowOps: `R${currentRow + 1} harr R${i + 1}`,
      })
      return [{ invMatrix, idMatrix }, Steps]
    }
  }
  return null
}
const reduceMatrix = (
  currentRow: number,
  currentCol: number,
  matrices: Matrices,
  Steps: Snapshot[],
  invertible: boolean
): [Matrices, Snapshot[], boolean] => {
  let { invMatrix, idMatrix } = matrices

  invertible = checkRowsForZero(invMatrix[currentRow])

  if (invertible === false) return [matrices, Steps, invertible]

  let invPivot = invMatrix[currentRow][currentCol]

  if (!checkForNonZero(invPivot)) {
    const swappedMatrices = rowSwap(
      currentRow,
      currentCol,
      {
        invMatrix,
        idMatrix,
      },
      Steps
    )
    if (!swappedMatrices) {
      invertible = false
    } else {
      ;[matrices, Steps] = swappedMatrices
      invMatrix = matrices.invMatrix
      idMatrix = matrices.idMatrix
      invPivot = invMatrix[currentRow][currentCol]
    }
  }

  ;[invMatrix, idMatrix, Steps] = normalizePivot(
    invPivot,
    currentRow,
    invMatrix,
    idMatrix,
    Steps
  )

  if (invertible) {
    const directions = ["top-down", "bottom-up"]
    for (const dir of directions) {
      const rowStart = dir === "top-down" ? currentRow + 1 : currentRow - 1
      const rowEnd = dir === "top-down" ? invMatrix.length : -1
      const iteration = dir === "top-down" ? 1 : -1

      for (
        let i = rowStart;
        dir === "top-down" ? i < rowEnd : i > rowEnd;
        i += iteration
      ) {
        const reductionNumberInv = invMatrix[i][currentCol]

        if (reductionNumberInv.num === 0) continue

        const scaledInvRow: Rational[] = scaleRow(
          invMatrix,
          currentRow,
          reductionNumberInv
        )
        const scaledIdRow: Rational[] = scaleRow(
          idMatrix,
          currentRow,
          reductionNumberInv
        )

        const operation = reductionNumberInv.num > 0 ? "subtract" : "add"

        invMatrix[i] = rowOperation(invMatrix, operation, i, scaledInvRow)
        idMatrix[i] = rowOperation(idMatrix, operation, i, scaledIdRow)

        const sign = operation === "add" ? "+" : "-"
        const numerator = Math.abs(reductionNumberInv.num)
        const denumerator =
          reductionNumberInv.den > 1 ? `/${reductionNumberInv.den}` : ""

        const finalString = numerator > 1 ? `${numerator}${denumerator} *` : ""

        Steps.push({
          invMatrix: matrixElementToString(invMatrix),
          idMatrix: matrixElementToString(idMatrix),
          rowOps: `R${i + 1} rarr R${i + 1} ${sign} ${finalString} R${
            currentRow + 1
          }`,
        })
      }
    }
  }
  return [matrices, Steps, invertible]
}

export default reduceMatrix
