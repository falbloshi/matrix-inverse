import { useEffect, useState } from "react"
import MatrixDisplay from "../utils/matrixDisplay"
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
      const values: string = MatrixDisplay(inputs.length, inputs)
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

  return (
    <div>
      <div>{inputs}</div>
      <MathJax>{display}</MathJax>
      <div>{result ? JSON.stringify(result) : ""}</div>
    </div>
  )
}

export default ResultPage