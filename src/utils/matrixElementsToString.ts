import { Matrix } from "./types"

const matrixElementToString = (matrix: Matrix): string[] => {
  const translatedMatrix = matrix.map((rowArray) =>
    rowArray.map((rational) =>
      rational.den > 1 ? `${rational.num}/${rational.den}` : `${rational.num}`
    )
  )

  return translatedMatrix.reduce((acc, row) => acc.concat(row), [])
}

export default matrixElementToString
