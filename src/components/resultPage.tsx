import { useEffect, useState } from "react"
import { MathJax } from "better-react-mathjax"
import gaussElimination from "../utils/math/gaussElimination"
import matrixWithRowOpsDisplay from "../utils/matrixWithRowOpsDisplay"
import { Page, PageDirection } from "../utils/types"

interface ResultPageProps {
  inputs: string[]
  display: string
  currentPage: Page
  navigate: (currentPage: Page, direction: PageDirection) => void
}

const ResultPage: React.FC<ResultPageProps> = ({
  inputs,
  display,
  currentPage,
  navigate,
}) => {
  const [result, setResult] = useState<string[] | null>([])
  const [isLast, setIsLast] = useState<boolean>(false)
  const [displayResult, setDisplayResult] = useState<JSX.Element[]>([])
  const [currentValue, setCurrentValue] = useState<number>(0)

  const nextValue = () => {
    if (!result || currentValue >= result.length - 1) return

    setCurrentValue(prev => prev + 1)

    if (currentValue == result.length - 2) {
      setIsLast(true)
    } else if (isLast) {
      setCurrentValue(result.length - 1)
    }
  }

  useEffect(() => {
    if (display !== "pending") {
      setResult(_prevResult =>
        matrixWithRowOpsDisplay(gaussElimination(inputs) as any[])
      )
      setCurrentValue(0)
      setDisplayResult([])
      setIsLast(false)
    } else {
      setResult(null)
    }
  }, [display, inputs])

  useEffect(() => {
    if (result !== null) {
      setDisplayResult(prev => [
        ...prev,
        <div key={currentValue}>
          <MathJax>{`$$${result[currentValue]}$$`}</MathJax>
        </div>,
      ])
    }
  }, [currentValue, result])

  return (
    <div>
      <h3 className="font-pt-sans">
        Element to Reduce to Reduced Row Echelon Form(RREF)
      </h3>

      <div className="text-6xl">
        <MathJax>{display}</MathJax>
        <MathJax>{result ? displayResult : ""}</MathJax>
      </div>
      <button
        onClick={nextValue}
        className="bg-neutral-700 text-white font-pt-sans text-2xl p-4 hover:bg-slate-500">
        {" "}
        {isLast ? "Result" : "Find Next Value"}
      </button>

      <div className="my-16">
        <button
          onClick={() => navigate(currentPage, "previous")}
          className="mr-4 px-4 py-2 font-pt-sans text-2xl text-white bg-blue-500 rounded hover:bg-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50">
          {`< Previous Page`}
        </button>
        <button
          onClick={() => navigate(currentPage, "next")}
          className="ml-4 px-4 py-2 font-pt-sans text-2xl text-white bg-blue-500 rounded hover:bg-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50">
          {`Next Page >`}
        </button>
      </div>
    </div>
  )
}

export default ResultPage
