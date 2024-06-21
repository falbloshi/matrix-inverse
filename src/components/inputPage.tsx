import SizeInput from "./sizeInput"
import MatrixInput from "./matrixInput"
import NavigationButtons from "./navigationButtons"

const InputPage = () => {


  return (
    <div className="flex flex-col mx-48 my-32 items-start justify-start">
      <SizeInput />
      <MatrixInput />
      <NavigationButtons />
    </div>
  )
}

export default InputPage
