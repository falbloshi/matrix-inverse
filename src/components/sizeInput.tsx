import { useState } from "react"

interface SizeInputProps {
  value: number;
  setValue: (value: number) => void
}

const SizeInput: React.FC<SizeInputProps> = ({ value, setValue }) => {
  const [isValid, setIsValid] = useState(true)

  const handleChange = (event: { target: { value: string } }) => {
    const inputValue = parseInt(event.target.value)
    if (!isNaN(inputValue) && inputValue >= 2 && inputValue <= 4) {
      setValue(inputValue)
      setIsValid(true)
    } else {
      setIsValid(false)
    }
  }

  return (
    <div>
      <p className="paragraph">
        Please input the size of your matrix (limited to 4x4 grid):
      </p>
      <input
        type="input"
        id="gridSize"
        name="gridSize"
        defaultValue={value}
        onChange={handleChange}
        className="my-12 w-20 h-16 text-3xl border-2 border-neutral-200 border-b-red-500 p-4 outline-none bg-neutral-200 focus:border-b-green-700"
      />
      {!isValid && (
        <div className="error">
          {" "}
          <p>Please insert a correct value between 2 and 4</p>
        </div>
      )}
    </div>
  )
}
export default SizeInput
