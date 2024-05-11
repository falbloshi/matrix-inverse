import SizeInput from "./sizeinput"
import MatrixInput from "./matrixinput"
import { useState } from "react"

const InputPage = () => {

  const [value, setValue] = useState<number>(2)

  return (
    <>
      <SizeInput value={value} setValue={setValue} />
      <MatrixInput value={value} />
    </>
  )
}

export default InputPage