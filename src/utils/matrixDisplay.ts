import reduceRationalForDisplay from "./reduceRationalForDisplay"

const matrixDisplay = (input: string[]) => {
  const size = Math.sqrt(input.length)
  let result = "\\begin{bmatrix}\n"
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
      result += row + "\n\\end{bmatrix}"
    }
  }
  return result
}

export default matrixDisplay
