import { useEffect, useState } from "react"
import { MathJax } from "better-react-mathjax"
import gaussElimination from "../utils/math/gaussElimination"
import matrixWithRowOpsDisplay from "../utils/matrixWithRowOpsDisplay"

interface ResultPageProps {
  inputs: string[]
  display: string
}

const ResultPage: React.FC<ResultPageProps> = ({ inputs, display }) => {

  const [result, setResult] = useState<string[] | null>([])
  const [isLast, setIsLast] = useState<boolean>(false)
  const [displayResult, setDisplayResult] = useState<JSX.Element[]>([])
  const [currentValue, setCurrentValue] = useState<number>(0)

  const nextValue = () => {
    if (!result || currentValue >= result.length - 1) return;

    setCurrentValue(prev => prev + 1)

    if (currentValue == result.length - 2) {
      setIsLast(true)
    }
    else if (isLast) {
      setCurrentValue(result.length - 1)
    }
  }

  useEffect(() => {
    if (display !== "pending") {
      setResult(_prevResult => matrixWithRowOpsDisplay(gaussElimination(inputs) as any[]))
      setCurrentValue(0)
      setDisplayResult([])
      setIsLast(false)
    }
    else {
      setResult(null)
    }
  }, [display, inputs])


  useEffect(() => {
    if (result !== null) {
      setDisplayResult(prev => [...prev,
      <div key={currentValue}>
        <MathJax>{`$$${result[currentValue]}$$`}</MathJax>
      </div>])
    }
  }, [currentValue, result])

  return (
    <div>
      <MathJax>{result ? `$$${result[currentValue]}$$` : ""}</MathJax>
      {displayResult}
      <button onClick={nextValue} className="bg-black text-white px-8"> {isLast ? "Result" : "Find Next Value"}</button>
    </div>
  )
}

export default ResultPage