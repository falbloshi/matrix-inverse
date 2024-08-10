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
        <button onClick={handleClear} className="btn btn-outline">Clear</button>
      </div>
      <AnimatePresence>
        {!isValid && <InputErrors error={error} />}
      </AnimatePresence>
    </div>
  )
}

export default SizeInput
