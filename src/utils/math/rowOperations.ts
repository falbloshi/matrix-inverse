import { Rational, Matrix, Matrices, Direction } from "../types"
import elementaryOperations from "./elementaryOperations"

const checkForNonZero = (input: Rational): Rational | null => {
  if (input.num !== 0) return input
  return null
}

// if returns true, end gaussian and turn invertible into false
const checkRowsForZero = (currentRowFromMatrix: Rational[]): boolean => {
  return currentRowFromMatrix.some((item) => checkForNonZero(item) !== null)
}

const reducePivot = (
  invPivot: Rational,
  currentRow: number,
  invMatrix: Matrix,
  idMatrix: Matrix
): [Matrix, Matrix] => {
  if (invPivot.num === 1) return [invMatrix, idMatrix]

  invMatrix[currentRow] = invMatrix[currentRow].map((item) =>
    elementaryOperations("divide", item, invPivot)
  )
  idMatrix[currentRow] = idMatrix[currentRow].map((item) =>
    elementaryOperations("divide", item, invPivot)
  )

  //steps for later on
  // const numForShow = PIVOT.num > 1 ? "/" + PIVOT.num : ""
  // Steps.push(`R${row}rarr${PIVOT.den}${numForShow}*R${row}`)

  return [invMatrix, idMatrix]
}

const rowSwap = (
  currentRow: number,
  currentCol: number,
  matrices: Matrices
): Matrices | null => {
  let { invMatrix, idMatrix } = matrices
  for (let i = currentRow; i < invMatrix.length; i++) {
    const isNonZero = checkForNonZero(invMatrix[i][currentCol])
    if (isNonZero) {
      ;[invMatrix[i], invMatrix[currentRow]] = [
        invMatrix[currentRow],
        invMatrix[i],
      ]
      ;[idMatrix[i], idMatrix[currentRow]] = [idMatrix[currentRow], idMatrix[i]]

      return { invMatrix, idMatrix }
    }
  }
  return null
}
const reduceMatrix = (
  currentRow: number,
  currentCol: number,
  matrices: Matrices,
  direction: Direction,
  invertible: boolean
): Matrices => {
  let { invMatrix, idMatrix } = matrices

  invertible = checkRowsForZero(invMatrix[currentRow])

  if (invertible === false) return matrices

  const rowStart = direction === "top-down" ? currentRow + 1 : currentRow - 1
  const rowEnd = direction === "top-down" ? invMatrix.length : -1
  const step = direction === "top-down" ? 1 : -1

  let invPivot = invMatrix[currentRow][currentCol]
  let idPivot = idMatrix[currentRow][currentCol]

  if (!checkForNonZero(invPivot)) {
    const swappedMatrices = rowSwap(currentRow, currentCol, {
      invMatrix,
      idMatrix,
    })
    if (!swappedMatrices) {
      invertible = false
    } else {
      invMatrix = swappedMatrices.invMatrix
      idMatrix = swappedMatrices.idMatrix
      invPivot = invMatrix[currentRow][currentCol]
      idPivot = idPivot[currentRow][currentRow]
    }
  }

  ;[invMatrix, idMatrix] = reducePivot(
    invPivot,
    currentRow,
    invMatrix,
    idMatrix
  )

  if (invertible) {
    for (
      let i = rowStart;
      direction === "top-down" ? i < rowEnd : i > rowEnd;
      i += step
    ) {
      const reductionNumberInv = invMatrix[i][currentCol]
      const reductionNumberId = idMatrix[i][currentCol]

      if (reductionNumberInv.num === 0) continue

      const scaledInvRow: Rational[] = invMatrix[currentRow].map((item) =>
        elementaryOperations("multiply", reductionNumberInv, item)
      )
      const scaledIdRow: Rational[] = idMatrix[currentRow].map((item) =>
        elementaryOperations("multiply", reductionNumberId, item)
      )

      const operation = reductionNumberInv.num > 0 ? "subtract" : "add"

      if (reductionNumberInv.num === 0) continue

      invMatrix[i] = invMatrix[i].map((invItem, index) => {
        return elementaryOperations(operation, invItem, scaledInvRow[index])
      })

      idMatrix[i] = invMatrix[i].map((idItem, index) => {
        return elementaryOperations(operation, idItem, scaledIdRow[index])
      })
    }
    return { invMatrix, idMatrix }
  }
  return matrices
}

export default reduceMatrix
