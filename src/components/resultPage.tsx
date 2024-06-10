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
  const [isLast, setIsLast] = useState<boolean>(false)
  const [currentValue, setCurrentValue] = useState<number>(0)

  const nextValue = () => {
    let length = 0
    if (result !== null) length = result.length
    if (isLast === false) {
      if (currentValue < length - 1) {
        setCurrentValue(prev => prev += 1)
      }
      else {
        setIsLast(true)
      }
    }
    else {
      setCurrentValue(0)
    }
  }

  useEffect(() => {
    if (display !== "pending") {
      setResult(_prevResult => matrixWithRowOpsDisplay(gaussElimination(inputs) as any[]))
    }
    else {
      setResult(null)
    }
  }, [display])



  console.log(currentValue)
  return (
    <div>

      <MathJax>{result ? `$$${result[currentValue]}$$` : ""}</MathJax>
      <button onClick={nextValue} className="bg-black text-white px-8"> {isLast ? "Result" : "Find Next Value"}</button>
    </div>
  )
}

export default ResultPage