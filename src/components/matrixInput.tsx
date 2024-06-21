import { useEffect, useRef, useState } from "react"
import matrixDisplay from "../utils/matrixDisplay"
import { useDebounce } from "../utils/hooks"
import { MathJax } from "better-react-mathjax"
import { useAppContext } from "../context/AppContext"
import InputErrors from "./inputErrors"

const MatrixInput = () => {

  const {
    value,
    inputs,
    setInputs,
    display,
    setDisplay,
  } = useAppContext()

  const inputRefs = useRef<(HTMLInputElement | null)[]>([])
  const [errors, setErrors] = useState<string[]>([])
  const [errorIndices, setErrorIndices] = useState<number[]>([])


  const regEx = new RegExp("^-?[0-9]+(\/[1-9][0-9]*)?$")

  const debouncedInputs = useDebounce(inputs)

  useEffect(() => {
    const validateInputs = () => {
      const newErrors: string[] = []
      const newErrorIndices: number[] = []

      debouncedInputs.forEach((newValue, index) => {
        const isRationalOrWhole = regEx.test(newValue)
        if (!isRationalOrWhole && newValue != "") {
          newErrors.push(`Wrong entry at R${Math.floor(index / value) + 1} C${Math.floor(index % value) + 1} - please use a whole(eg. 0, 1, -3) or a rational number with "/" forward slash with leading negative sign (e.g -5/3 or 4/7)`)
          newErrorIndices.push(index)
        }
      })

      setErrors(newErrors)
      setErrorIndices(newErrorIndices)
    }

    validateInputs()
  }, [debouncedInputs])


  const handleInputChange = (index: number) => (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value
    const newInputs = [...inputs]
    newInputs[index] = newValue
    setInputs(newInputs)
  }

  useEffect(() => {
    inputRefs.current.forEach((ref, index) => {
      errorIndices.includes(index) ? ref?.classList.add("input-error", "focus:input-error") : ref?.classList.remove("input-error", "focus:input-error")
    })
  }, [errorIndices])

  useEffect(() => {
    const newInputs = Array(value * value).fill("")
    const newRefs = Array(value * value).fill(null)
    setInputs(newInputs)
    inputRefs.current = newRefs
  }, [value])

  const grid = []
  for (let i = 0;i < value;i++) {
    const row = []
    for (let j = 0;j < value;j++) {
      const index = i * value + j
      row.push(
        <input
          key={`${i}-${j}-${value}`}
          type="text"
          placeholder={`R${i + 1} C${j + 1}`}
          ref={el => (inputRefs.current[index] = el)}
          value={inputs[index]}
          onChange={handleInputChange(index)}
          className="input input-bordered focus:input-primary w-32 h-12 text-2xl placeholder:text-xs"
        />
      )
    }
    grid.push(
      <div
        key={i}
        className={`flex flex-row justify-left gap-4`}>
        {row}
      </div>
    )
  }

  useEffect(() => {
    if (inputs.every(item => item.trim() != "")) {
      const values: string = matrixDisplay(inputs)
      setDisplay(values)
    }
    else {
      setDisplay(null)
    }
  }, [inputs])

  return (
    <div className="grid grid-cols-2 gap-4">

      <div className={`grid grid-cols-[${value}] gap-4`}>{grid}</div>
      {errors && errors.map((error, index) => <InputErrors key={index} error={error} />)}

      <MathJax className="ml-12">{display}</MathJax>
    </div>
  )
}

export default MatrixInput


/*
"font-pt-serif text-3xl border-b border-b-black p-2 focus:outline-none focus:bg-teal-100 placeholder:font-sans placeholder:text-sm max-w-36 placeholder:text-neutral-400"*/