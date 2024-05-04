"use client"

import { useState } from "react"

const SizeInput = () => {
  const [value, setValue] = useState(2)
  const [isValid, setIsValid] = useState(true)

  const handleChange = (event: { target: { value: any } }) => {
    const inputValue = event.target.value
    if (/^\d+$/.test(inputValue) && inputValue >= 2 && inputValue <= 6) {
      setValue(inputValue)
      setIsValid(prev => true)
    } else {
      setIsValid(prev => !prev)
    }
  }

  return (
    <div>
      <p className="paragraph">
        Please input the size of your matrix (limited to 6x6 grid)
      </p>
      <form>
        <input
          type="text"
          id="gridSize"
          name="gridSize"
          defaultValue={value}
          onChange={handleChange}
          min="2"
          max="6"
          className="my-12 w-32 h-16 text-3xl border-2 border-b-zinc-500 p-4 outline-none bg-zinc-200"
        />
      </form>
      {!isValid && (
        <p className="error">Please insert a correct value between 2 and 6</p>
      )}
    </div>
  )
}
export default SizeInput
