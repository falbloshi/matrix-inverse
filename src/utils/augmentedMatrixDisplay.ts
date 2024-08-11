import reduceRationalForDisplays from "./reduceRationalForDisplays"

const augmentedMatrixDisplay = (
  invMatrix: string[],
  idMatrix: string[],
  rowOps: string
) => {
  const size = Math.sqrt(invMatrix.length)

  const c = "c".repeat(size)

  let result = `\\begin{bmatrix}\n\\begin{array}{${c}|${c}}\n`
  for (let i = 0; i < size; i++) {
    let rowElement = ""
    let colIndex = 0
    for (let j = 0; j < size * 2; j++) {
      if (colIndex > size - 1) colIndex = 0
      const eleOfA = reduceRationalForDisplays(invMatrix[i * size + colIndex])
      const eleOfId = reduceRationalForDisplays(idMatrix[i * size + colIndex])
      colIndex += 1
      rowElement += j < size ? eleOfA : eleOfId
      if (j < size * 2 - 1) {
        rowElement += " & "
      }
    }

    result +=
      i < size - 1
        ? rowElement + "\\\\[0.3em]\n"
        : rowElement + "\n\\end{array}\n\\end{bmatrix}"
  }
  if (rowOps) result += ` \\qquad ${rowOps}`
  return result
}

export default augmentedMatrixDisplay
