import { useEffect, useState } from "react"
import MatrixDisplay from "../utils/matrixDisplay"
import { MathJax } from "better-react-mathjax"

interface ResultPageProps {
  inputs: string[]
}

const ResultPage: React.FC<ResultPageProps> = ({ inputs }) => {

  const [display, setDisplay] = useState<string>("")

  useEffect(() => {
    if (inputs.every(item => item.trim() != "")) {
      const values: string = MatrixDisplay(inputs.length, inputs)
      setDisplay(values)
    }
    else {
      setDisplay("pending")
    }
  }, [inputs])

  return (
    <div>
      <div>{inputs}</div>
      <MathJax>{display}</MathJax>
    </div>
  )
}

export default ResultPage