import reduceRationalForDisplays from "./reduceRationalForDisplays"

const matrixDisplay = (input: string[]) => {
  const size = Math.sqrt(input.length)
  let result = "\\begin{bmatrix}\n"
  for (let i = 0; i < size; i++) {
    let row = ""
    for (let j = 0; j < size; j++) {
      let element = reduceRationalForDisplays(input[i * size + j])
      row += element
      if (j < size - 1) {
        row += " & "
      }
    }

    result += i < size - 1 ? row + "\\\\[0.3em]\n" : row + "\n\\end{bmatrix}"
  }
  return result
}

export default matrixDisplay
