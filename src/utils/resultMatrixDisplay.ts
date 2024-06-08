import matrxDisplay from "./matrixDisplay"

const resultMatrixDisplay = (
  ogMatrix: string[],
  invMatrix: string[],
  result: string[],
  rowOps: string
) => {
  let resultString: string = ""

  resultString += `${matrxDisplay(ogMatrix)} \\cdot ${matrxDisplay(
    invMatrix
  )} = ${matrxDisplay(result)} \\Longrightarrow ${rowOps}`

  return resultString
}

export default resultMatrixDisplay
