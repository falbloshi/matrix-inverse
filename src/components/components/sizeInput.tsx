import { useEffect, useRef, useState } from "react"
import { useAppContext } from "../../context/AppContext"
import { useDebounce } from "../../utils/hooks"
import InputErrors from "./inputErrors"
import { AnimatePresence } from "framer-motion"
import { InlineMath } from 'react-katex';
import 'katex/dist/katex.min.css'

const SizeInput = () => {
  const { matrixSize, setMatrixSize, handleClear } = useAppContext()
  const [isValid, setIsValid] = useState<boolean>(true)
  const [localValue, setLocalValue] = useState<string | number>(matrixSize)
  const inputRef = useRef<HTMLInputElement>(null)

  //still this issue is unresolved, when you move up from to 2 to 4 and then 5, it resets fine, but if you go from 2 to 5, it stays on the error 
  useEffect(() => {
    setLocalValue(matrixSize)
  }, [matrixSize])
  const debouncedValue = useDebounce(localValue, 200)

  const error = `Please insert a correct value between 2 and 4, you have inserted ${localValue ? localValue : "an empty value"
    }`

  const handleChange = (event: { target: { value: string } }) => {
    setLocalValue(event.target.value)
    const inputValue = parseInt(event.target.value)

    if (!isNaN(inputValue) && inputValue >= 2 && inputValue <= 4) {
      setMatrixSize(inputValue)
      setIsValid(true)
    }
  }

  useEffect(() => {
    const val = parseInt(debouncedValue as string)
    setIsValid(!isNaN(val) && val >= 2 && val <= 4)
  }, [debouncedValue])

  return (
    <div>
      <p className="paragraph mb-4">
        Please input the size of your matrix (max {<InlineMath math={'4^2'} />} )  and fill the
        matrix:
      </p>
      <div className="flex gap-4">
        <input
          type="input"
          id="gridSize"
          name="gridSize"
          ref={inputRef}
          value={localValue}
          defaultValue={matrixSize}
          onChange={handleChange}
          className={`input input-bordered focus:input-primary w-12 mb-4 text-2xl focus:outline-0 ${isValid ? "" : "input-error focus:input-error"
            } `}
        />
        <button onClick={handleClear} className="btn btn-outline">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
          </svg>

          Clear</button>
      </div>
      <AnimatePresence>
        {!isValid && <InputErrors error={error} />}
      </AnimatePresence>
    </div>
  )
}

export default SizeInput
