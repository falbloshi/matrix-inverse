// const MatrixDisplay = (length: number, input: String[]) => {
//   const size = Math.sqrt(length)
//   let result = "`["
//   for (let i = 0; i < size; i++) {
//     let row = "["
//     for (let j = 0; j < size; j++) {
//       let element = input[i * size + j]
//       row += element
//       if (j < size - 1) {
//         row += ","
//       }
//     }
//     row += "]"
//     if (i < size - 1) {
//       result += row + ","
//     } else {
//       result += row
//     }
//   }
//   result += "]`"
//   return result
// }

import reduceRationalForDisplay from "./reduceRationalForDisplay"

const MatrixDisplay = (length: number, input: string[]) => {
  const size = Math.sqrt(length)
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

export default MatrixDisplay
