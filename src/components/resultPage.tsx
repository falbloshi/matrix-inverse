import { useEffect, useState } from "react"
import matrixDisplay from "../utils/matrixDisplay"
import { MathJax } from "better-react-mathjax"
import gaussElimination from "../utils/math/gaussElimination"

interface ResultPageProps {
  inputs: string[]
}

const ResultPage: React.FC<ResultPageProps> = ({ inputs }) => {

  const [display, setDisplay] = useState<string>("pending")
  const [result, setResult] = useState<any[] | null>([])

  useEffect(() => {
    if (inputs.every(item => item.trim() != "")) {
      const values: string = matrixDisplay(inputs)
      setDisplay(values)
    }
    else {
      setDisplay("pending")
    }
  }, [inputs])

  useEffect(() => {
    console.log(display)
    if (display !== "pending") {
      setResult(_prevResult => gaussElimination(inputs))
    }
    else {
      setResult(null)
    }
  }, [display])

  const someResult = `\\begin{bmatrix}
  \\begin{array}{cc|cc}
  1 & \\frac{1}{2} & \\frac{1}{2} & 0\\\\
  4 & -3 & 0 & 1
  \\end{array}
  \\end{bmatrix}`

  const rowOps = `R_1 \\longrightarrow \\frac{1}{2} \\cdot R_1`;

  const combinedResult = `${someResult} \\qquad ${rowOps}`

  return (
    <div>
      <div>{inputs}</div>
      <MathJax>{`$$${someResult}$$`}</MathJax>
      <MathJax>{`$$${combinedResult}$$`}</MathJax>
      <div>{result ? JSON.stringify(result) : ""}</div>
    </div>
  )
}

export default ResultPage