import SizeInput from "./sizeinput"
import MatrixInput from "./matrixinput"

interface InputPageProps {
  value: number
  inputs: string[]
  display: string
  setValue: (value: number) => void
  setInputs: (inputs: string[]) => void
  setDisplay: (display: string) => void
}

const InputPage: React.FC<InputPageProps> = ({ value, setValue, inputs, setInputs, display, setDisplay }) => {

  return (
    <>
      <SizeInput value={value} setValue={setValue} />
      <MatrixInput value={value} inputs={inputs} setInputs={setInputs} display={display} setDisplay={setDisplay} />
    </>
  )
}

export default InputPage