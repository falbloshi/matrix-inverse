import { useEffect, useRef, useState } from "react"
import { useAppContext } from "../context/AppContext"
import { useDebounce } from "../utils/hooks"


const SizeInput = () => {

  const { matrixSize, setMatrixSize } = useAppContext()
  const [isValid, setIsValid] = useState<boolean>(true)
  const [localValue, setLocalValue] = useState<string | number>(matrixSize)
  const inputRef = useRef<HTMLInputElement>(null)

  const debouncedValue = useDebounce(localValue, 200)

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
        Please input the size of your matrix (limited to 4x4 grid):
      </p>
      <input
        type="input"
        id="gridSize"
        name="gridSize"
        ref={inputRef}
        defaultValue={matrixSize}
        onChange={handleChange}
        className={`input input-bordered focus:input-primary w-12 mb-4 text-2xl ${isValid ? '' : 'input-error focus:input-error'} `}
      />
      {!isValid && (
        <div className="alert alert-error mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-8">
            <path strokeLinecap="round" strokeLinejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
          </svg>

          <span className="text-xl">Please insert a correct value between 2 and 4, you have inserted {localValue ? localValue : "an empty value"}</span>
        </div>
      )}
    </div>
  )
}
export default SizeInput
