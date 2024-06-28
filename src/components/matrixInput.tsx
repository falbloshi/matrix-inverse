import { useEffect, useRef, useState } from "react"
import matrixDisplay from "../utils/matrixDisplay"
import { useDebounce } from "../utils/hooks"
import { MathJax } from "better-react-mathjax"
import { useAppContext } from "../context/AppContext"
import InputErrors from "./inputErrors"
import { motion as m, AnimatePresence } from "framer-motion"
import { inputContainer, inputPopIn } from "../animations"

const MatrixInput = () => {
  const { matrixSize, inputs, setInputs, display, setDisplay } = useAppContext()

  const inputRefs = useRef<(HTMLInputElement | null)[]>([])
  const [errors, setErrors] = useState<string[]>([])
  const [errorIndices, setErrorIndices] = useState<number[]>([])

  const regEx = new RegExp("^-?[0-9]+(/[1-9][0-9]*)?$")

  const debouncedInputs = useDebounce(inputs)

  useEffect(() => {
    const validateInputs = () => {
      const newErrors: string[] = []
      const newErrorIndices: number[] = []

      debouncedInputs.forEach((newValue, index) => {
        const isRationalOrWhole = regEx.test(newValue)
        if (!isRationalOrWhole && newValue != "") {
          newErrors.push(
            `Wrong entry at R${Math.floor(index / matrixSize) + 1} C${
              Math.floor(index % matrixSize) + 1
            } - please use a whole(eg. 0, 1, -3) or a rational number with "/" forward slash with leading negative sign (e.g -5/3 or 4/7)`
          )
          newErrorIndices.push(index)
        }
      })

      setErrors(newErrors)
      setErrorIndices(newErrorIndices)
    }

    validateInputs()
  }, [debouncedInputs])

  const handleInputChange =
    (index: number) => (event: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = event.target.value
      const newInputs = [...inputs]
      newInputs[index] = newValue
      setInputs(newInputs)
    }

  useEffect(() => {
    inputRefs.current.forEach((ref, index) => {
      errorIndices.includes(index)
        ? ref?.classList.add("input-error", "focus:input-error")
        : ref?.classList.remove("input-error", "focus:input-error")
    })
  }, [errorIndices])

  useEffect(() => {
    const newInputs = Array(matrixSize * matrixSize).fill("")
    const newRefs = Array(matrixSize * matrixSize).fill(null)
    setInputs(newInputs)
    inputRefs.current = newRefs
  }, [matrixSize])

  const grid = Array.from({ length: matrixSize }).map((_, i) => (
    <div
      key={i}
      className={`grid-items-row`}>
      {Array.from({ length: matrixSize }).map((_, j) => {
        const index = i * matrixSize + j
        return (
          <input
            key={index}
            type="text"
            placeholder={`R${i + 1} C${j + 1}`}
            ref={el => (inputRefs.current[index] = el)}
            value={inputs[index]}
            onChange={handleInputChange(index)}
            className="grid-items"
          />
        )
      })}
    </div>
  ))

  useEffect(() => {
    if (inputs.every(item => item.trim() != "")) {
      const compiledMatrix: string = matrixDisplay(inputs)
      setDisplay(compiledMatrix)
    } else {
      setDisplay(null)
    }
  }, [inputs])

  return (
    <div className="flex flex-col gap-4">
      <div className={`grid grid-cols-[${matrixSize}] gap-4`}>{grid}</div>
      <AnimatePresence>
        {errors &&
          errors.map((error, index) => (
            <InputErrors
              key={index}
              error={error}
            />
          ))}
      </AnimatePresence>

      <MathJax className="ml-12">{display}</MathJax>
    </div>
  )
}

export default MatrixInput
