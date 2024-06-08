import { useEffect, useState } from "react"
import { MathJax } from "better-react-mathjax"
import gaussElimination from "../utils/math/gaussElimination"
import matrixWithRowOpsDisplay from "../utils/matrixWithRowOpsDisplay"

interface ResultPageProps {
  inputs: string[]
  display: string
}

const ResultPage: React.FC<ResultPageProps> = ({ inputs, display }) => {

  const [result, setResult] = useState<any[] | null>([])

  useEffect(() => {
    if (display !== "pending") {
      setResult(_prevResult => matrixWithRowOpsDisplay(gaussElimination(inputs) as any[]))
    }
    else {
      setResult(null)
    }
  }, [display])



  return (
    <div>
      <MathJax>{result ? `$$${result}$$` : ""}</MathJax>
    </div>
  )
}

export default ResultPage