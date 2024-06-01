import { useEffect, useRef, useState } from "react"
import MatrixDisplay from "../utils/matrixDisplay"

interface MatrixInputProps {
  value: number
  inputs: string[]
  setInputs: (inputs: string[]) => void
}

const MatrixInput: React.FC<MatrixInputProps> = ({ value, inputs, setInputs }) => {
  const numRows = value

  const [display, setDisplay] = useState<String>("")
  const inputRefs = useRef<(HTMLInputElement | null)[]>([])

  const handleInputChange =
    (index: number) => (event: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = event.target.value
      const newInputs = [...inputs]
      newInputs[index] = newValue
      setInputs(newInputs)
    }

  useEffect(() => {
    const newInputs = Array(numRows * numRows).fill("")
    const newRefs = Array(numRows * numRows).fill(null)
    setInputs(newInputs)
    inputRefs.current = newRefs
  }, [numRows])

  const grid = []
  for (let i = 0;i < numRows;i++) {
    const row = []
    for (let j = 0;j < numRows;j++) {
      const index = i * numRows + j
      row.push(
        <input
          key={`${i}-${j}-${numRows}`}
          type="text"
          placeholder={`R${i + 1} C${j + 1}`}
          ref={el => (inputRefs.current[index] = el)}
          value={inputs[index]}
          onChange={handleInputChange(index)}
          className="font-pt-serif text-3xl border-b border-b-black p-2 focus:outline-none focus:bg-green-100 placeholder:font-sans placeholder:text-sm max-w-36 placeholder:text-neutral-400"
        />
      )
    }
    grid.push(
      <div
        key={i}
        className="flex flex-wrap gap-4">
        {row}
      </div>
    )
  }

  const displayValues = inputs.map((value, index) => (
    <p key={index}>{`Value ${index + 1}: ${value}`}</p>
  ))

  useEffect(() => {
    if (inputs.every(item => item.trim() != "")) {
      const values: String = MatrixDisplay(inputs.length, inputs)
      setDisplay(values)
      console.log(values)
    }
  }, [inputs])

  console.log(grid)
  return (
    <>
      <div className={`grid grid-cols-[${value}] gap-4`}>{grid}</div>
      <div>{displayValues}</div>
    </>
  )
}
export default MatrixInput
