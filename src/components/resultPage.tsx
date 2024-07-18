import {useState, useMemo, useCallback, useRef, useEffect} from "react"
import NavigationButtons from "./navigationButtons"
import ResultNavigationButton from "./resultNavigationButtons"
import InputErrors from "./inputErrors"
import ReturnDisplayResult from "./returnDisplayResult"
import {motion as m} from "framer-motion"
import {resultSlideIn} from "../animations"
import {AnimatePresence} from "framer-motion"

const ResultPage = () => {
  const displayElements = useMemo(() => ReturnDisplayResult(), [])

  const [currentIndex, setCurrentIndex] = useState<number>(0)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const {current} = containerRef
    if (current && current?.children.length > 1) {
      current.lastElementChild?.scrollIntoView({behavior: "smooth"})
    }
  }, [currentIndex])

  const nextValue = useCallback(() => {
    if (!displayElements) return
    if (currentIndex < displayElements.length - 1) {
      setCurrentIndex(prev => prev + 1)
    }
  }, [currentIndex, displayElements?.length])

  const prevValue = useCallback(() => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1)
    }
  }, [currentIndex])

  const firstValue = useCallback(() => {
    setCurrentIndex(0)
  }, [])

  const lastValue = useCallback(() => {
    if (!displayElements) return
    if (displayElements.length > 0) {
      setCurrentIndex(displayElements.length - 1)
    }
  }, [displayElements?.length])

  const renderElements = useMemo(() => {
    if (!displayElements) return null
    return displayElements.map((element, index) => (
      <m.div
        key={index + `mathJaxElement`}
        className="child overflow-hidden w-fit"
        variants={resultSlideIn}
        initial="hidden"
        animate="visible"
        exit="exit">
        {element}
      </m.div>
    ))
  }, [])

  return (
    <div className="flex flex-col mx-48 my-32 items-start justify-start">
      <p className="paragraph mb-4">
        Element to reduce to Reduced Row Echelon Form(RREF)
      </p>

      {displayElements && (
        <div className="relative flex flex-row flex-grow gap-32 h-fit">
          <div className="sticky self-end bottom-4">
            <ResultNavigationButton
              first={firstValue}
              last={lastValue}
              next={nextValue}
              prev={prevValue}
              current={currentIndex}
              indexSize={displayElements.length - 1}
            />
          </div>

          <div
            ref={containerRef}
            className="flex flex-col">
            <AnimatePresence>
              {renderElements?.slice(0, currentIndex + 1)}
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
