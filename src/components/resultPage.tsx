import { useEffect, useRef, useState } from "react"
import { MathJax } from "better-react-mathjax"
import gaussElimination from "../utils/math/gaussElimination"
import matrixWithRowOpsDisplay from "../utils/matrixWithRowOpsDisplay"
import { useAppContext } from "../context/AppContext"
import NavigationButtons from "./navigationButtons"
import ResultNavigationButton from "./resultNavigationButtons"

const ResultPage = () => {
  const { inputs } = useAppContext()

  const [result, setResult] = useState<string[] | null>([])
  const [displayResult, setDisplayResult] = useState<JSX.Element[]>([])
  const [currentIndex, setCurrentIndex] = useState<number>(0)
  const latestElementRef = useRef<HTMLDivElement | null>(null)

  const nextValue = () => {
    if (!result) return
    if (currentIndex >= result.length - 1) return
    setCurrentIndex(prev => prev + 1)
  }

  const prevValue = () => {
    if (currentIndex <= 0) return
    setCurrentIndex(prev => prev - 1)
  }

  const firstValue = () => {
    setCurrentIndex(0)
  }

  const lastValue = () => {
    if (!result) return
    setCurrentIndex(result.length - 1)
  }

  useEffect(() => {
    if (inputs) {
      setResult(
        matrixWithRowOpsDisplay(gaussElimination(inputs) as any[])
      )
      setCurrentIndex(0)
      setDisplayResult([])
    } else {
      setResult(null)
    }
  }, [inputs])

  useEffect(() => {
    if (result !== null) {
      setDisplayResult(
        _prev =>
          (_prev = result.map((element, index) => (
            <div
              key={index}
              ref={index === currentIndex ? latestElementRef : null}>
              {index > 0 && <h3 className="font-serif">{index}. </h3>}
              <MathJax>{`$$${element}$$`}</MathJax>
            </div>
          )))
      )
    }
  }, [currentIndex, result])

  useEffect(() => {
    if (latestElementRef.current) {
      latestElementRef.current.scrollIntoView({ behavior: "smooth" })
    }
  }, [currentIndex, displayResult])

  return (
    <div className="flex flex-col mx-48 my-32 items-start justify-start">
      <p className="paragraph mb-4">
        Element to reduce to Reduced Row Echelon Form(RREF)
      </p>

      {result && (
        <div className="flex flex-row flex-grow gap-32 h-fit">
          <div className="flex items-end">
            <ResultNavigationButton
              first={firstValue}
              last={lastValue}
              next={nextValue}
              prev={prevValue}
              current={currentIndex}
              indexSize={result.length - 1}
            />
          </div>
          <div>
            <MathJax>
              {result ? displayResult.slice(0, currentIndex + 1) : ""}
            </MathJax>
          </div>
        </div>
      )}
      {!result && (
        <p className="alert alert-error">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-8">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
            />
          </svg>
          There is not input from Input page or the result is not an inversible
          matrix.
        </p>
      )}
      <NavigationButtons />
    </div>
  )
}

export default ResultPage
