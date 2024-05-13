import { useEffect, useState } from "react"
import MatrixDisplay from "../utils/matrixDisplay"
import { MathJax } from "better-react-mathjax"

interface ResultPageProps {
  inputs: String[]
}

const ResultPage: React.FC<ResultPageProps> = ({ inputs }) => {

  const [display, setDisplay] = useState<String>("")

  useEffect(() => {
    if (inputs.every(item => item.trim() != "")) {
      const values: String = MatrixDisplay(inputs.length, inputs)
      setDisplay(values)
      console.log(values)
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