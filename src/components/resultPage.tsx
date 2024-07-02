import { useEffect, useState } from "react"
import NavigationButtons from "./navigationButtons"
import ResultNavigationButton from "./resultNavigationButtons"
import InputErrors from "./inputErrors"
import ReturnDisplayResult from "./returnDisplayResult"
import { motion as m } from "framer-motion"
import { resultSlideIn } from "../animations"
import { AnimatePresence } from "framer-motion"

const ResultPage = () => {
  const displayElements = ReturnDisplayResult()

  const [currentIndex, setCurrentIndex] = useState<number>(0)
  const [elements, setElements] = useState(displayElements)

  const nextValue = () => {
    if (!displayElements) return
    if (currentIndex >= displayElements.length - 1) return
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
    if (!displayElements) return
    setCurrentIndex(displayElements.length - 1)
  }

  useEffect(() => {
    if (!displayElements) return
    const result = displayElements.map((element, index) => (
      <m.div
        key={index + `mathJaxElement`}
        className={`child overflow-hidden w-fit`}
        variants={resultSlideIn}
        initial="hidden"
        animate="visible"
        exit="exit">
        {element}
      </m.div>
    ))

    setElements(result)
  }, [])

  return (
    <div className="flex flex-col mx-48 my-32 items-start justify-start">
      <p className="paragraph mb-4">
        Element to reduce to Reduced Row Echelon Form(RREF)
      </p>

      {displayElements && (
        <div className="flex flex-row flex-grow gap-32 h-fit">
          <div className="flex items-end">
            <ResultNavigationButton
              first={firstValue}
              last={lastValue}
              next={nextValue}
              prev={prevValue}
              current={currentIndex}
              indexSize={displayElements.length - 1}
            />
          </div>

          <div className="flex flex-col">
            <AnimatePresence>
              {elements?.slice(0, currentIndex + 1).map((element, index) => {
                return <m.div key={index}>{element}</m.div>
              })}
            </AnimatePresence>
          </div>
        </div>
      )}

      {!displayElements && (
        <InputErrors
          error={
            "There is not input from Input page or the result is not an inversible matrix."
          }
        />
      )}

      <NavigationButtons />
    </div>
  )
}

export default ResultPage
