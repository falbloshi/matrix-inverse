import { useEffect, useRef, useState } from "react"
import { MathJax } from "better-react-mathjax"
import gaussElimination from "../utils/math/gaussElimination"
import matrixWithRowOpsDisplay from "../utils/matrixWithRowOpsDisplay"
import { useAppContext } from "../context/AppContext"

const ResultPage = () => {

  const { inputs, currentPage, handleNavigate } = useAppContext()

  const [result, setResult] = useState<string[] | null>(null)
  const [isLast, setIsLast] = useState<boolean>(false)
  const [displayResult, setDisplayResult] = useState<JSX.Element[]>([])
  const [currentValue, setCurrentValue] = useState<number>(0)
  const latestElementRef = useRef<HTMLDivElement | null>(null)

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
    if (inputs) {
      setResult(_prevResult =>
        matrixWithRowOpsDisplay(gaussElimination(inputs) as any[])
      )
      setCurrentValue(0)
      setDisplayResult([])
      setIsLast(false)
    } else {
      setResult(null)
    }
  }, [inputs])

  useEffect(() => {
    if (result !== null) {
      // const currentSlice = result.slice(0, currentValue + 1)
      setDisplayResult(prev =>
        prev = result.map((element, index) =>
          <div key={index} ref={index === currentValue ? latestElementRef : null}>
            {index > 0 && <h3 className="text-3xl">{index}. </h3>}
            <MathJax>{`$$${element}$$`}</MathJax>
          </div>)
      )
    }
  }, [currentValue, result])

  useEffect(() => {
    if (latestElementRef.current) {
      latestElementRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [currentValue, displayResult]);

  return (
    <div>
      <h3 className="font-pt-sans">
        Element to Reduce to Reduced Row Echelon Form(RREF)
      </h3>

      <div className="">
        <MathJax>{result ? displayResult.slice(0, currentValue + 1) : ""}</MathJax>
      </div>
      <button
        onClick={nextValue}
        className="bg-neutral-700 text-white font-pt-sans text-2xl p-4 hover:bg-slate-500">
        {" "}
        {isLast ? "Result" : "Find Next Value"}
      </button>

      <div className="my-16">
        <button
          onClick={() => handleNavigate(currentPage, "previous")}
          className="nav-btn">
          {`< Previous Page`}
        </button>
        <button
          onClick={() => handleNavigate(currentPage, "next")}
          className="nav-btn">
          {`Next Page >`}
        </button>
      </div>
    </div>
  )
}

export default ResultPage
