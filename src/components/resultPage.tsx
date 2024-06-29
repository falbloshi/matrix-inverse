import { useState } from "react"
import { MathJax } from "better-react-mathjax"
import NavigationButtons from "./navigationButtons"
import ResultNavigationButton from "./resultNavigationButtons"
import InputErrors from "./inputErrors"
import ReturnDisplayResult from "./returnDisplayResult"
import { motion as m } from "framer-motion"

const ResultPage = () => {

  const displayResult = ReturnDisplayResult()

  const [currentIndex, setCurrentIndex] = useState<number>(0)

  const nextValue = () => {
    if (!displayResult) return
    if (currentIndex >= displayResult.length - 1) return
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
    if (!displayResult) return
    setCurrentIndex(displayResult.length - 1)
  }

  return (
    <div className="flex flex-col mx-48 my-32 items-start justify-start">
      <p className="paragraph mb-4">
        Element to reduce to Reduced Row Echelon Form(RREF)
      </p>

      {displayResult && (
        <div className="flex flex-row flex-grow gap-32 h-fit">
          <div className="flex items-end">
            <ResultNavigationButton
              first={firstValue}
              last={lastValue}
              next={nextValue}
              prev={prevValue}
              current={currentIndex}
              indexSize={displayResult.length - 1}
            />
          </div>
          <div>
            <MathJax>
              {displayResult
                ? <m.div> displayResult.slice(0, currentIndex + 1) </m.div>
                : ""}
            </MathJax>
          </div>
        </div>
      )}
      {!displayResult && (
        <InputErrors error={"There is not input from Input page or the result is not an inversible matrix."} />
      )
      }
      <NavigationButtons />
    </div >
  )
}

export default ResultPage
