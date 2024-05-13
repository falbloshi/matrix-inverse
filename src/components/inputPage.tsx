import SizeInput from "./sizeinput"
import MatrixInput from "./matrixinput"

interface InputPageProps {
  value: number
  inputs: string[]
  setValue: (value: number) => void
  setInputs: (inputs: string[]) => void
}

const InputPage: React.FC<InputPageProps> = ({ value, setValue, inputs, setInputs }) => {

  // const [value, setValue] = useState<number>(2)

  return (
    <>
      <SizeInput value={value} setValue={setValue} />
      <MatrixInput value={value} inputs={inputs} setInputs={setInputs} />
    </>
  )
}

export default InputPage