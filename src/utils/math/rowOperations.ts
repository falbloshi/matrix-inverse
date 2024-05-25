import {
  Rational,
  Matrix,
  Matrices,
  Direction,
  Snapshot,
  Operation,
} from "../types"
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
    elementaryOperations("multiply", reductionNumberInv, item)
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

const reducePivot = (
  invPivot: Rational,
  currentRow: number,
  invMatrix: Matrix,
  idMatrix: Matrix,
  Steps: Snapshot[]
): [Matrix, Matrix, Snapshot[]] => {
  if (invPivot.num === 1) return [invMatrix, idMatrix, Steps]

  invMatrix[currentRow] = invMatrix[currentRow].map((item) =>
    elementaryOperations("divide", item, invPivot)
  )
  idMatrix[currentRow] = idMatrix[currentRow].map((item) =>
    elementaryOperations("divide", item, invPivot)
  )

  const numForShow = invPivot.num > 1 ? "/" + invPivot.num : ""
  Steps.push({
    invMatrix: matrixElementToString(invMatrix),
    idMatrix: matrixElementToString(idMatrix),
    rowOps: `R${currentRow + 1}rarr${invPivot.den}${numForShow}*R${
      currentRow + 1
    }`,
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
        rowOps: `R${currentRow + 1}harrR${i + 1}`,
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
  direction: Direction,
  Steps: Snapshot[],
  invertible: boolean
): [Matrices, Snapshot[], boolean] => {
  let { invMatrix, idMatrix } = matrices

  invertible = checkRowsForZero(invMatrix[currentRow])

  if (invertible === false) return [matrices, Steps, invertible]

  const rowStart = direction === "top-down" ? currentRow + 1 : currentRow - 1
  const rowEnd = direction === "top-down" ? invMatrix.length : -1
  const iteration = direction === "top-down" ? 1 : -1

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

  ;[invMatrix, idMatrix, Steps] = reducePivot(
    invPivot,
    currentRow,
    invMatrix,
    idMatrix,
    Steps
  )

  if (invertible) {
    for (
      let i = rowStart;
      direction === "top-down" ? i < rowEnd : i > rowEnd;
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

      if (reductionNumberInv.num === 0) continue

      invMatrix[i] = rowOperation(invMatrix, operation, i, scaledInvRow)
      idMatrix[i] = rowOperation(idMatrix, operation, i, scaledIdRow)

      const sign = operation === "add" ? "+" : "-"
      let [numerator, denumerator] = [
        reductionNumberInv.num,
        reductionNumberInv.den.toString(),
      ]

      denumerator = reductionNumberInv.den > 1 ? "/" + denumerator : ""

      Steps.push({
        invMatrix: matrixElementToString(invMatrix),
        idMatrix: matrixElementToString(idMatrix),
        rowOps: `R${i + 1}rarrR${i + 1}${sign}${numerator}${denumerator}*R${
          currentRow + 1
        }`,
      })
    }
    return [{ invMatrix, idMatrix }, Steps, invertible]
  }
  return [matrices, Steps, invertible]
}

export default reduceMatrix