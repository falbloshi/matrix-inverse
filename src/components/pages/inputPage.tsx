import SizeInput from "../components/sizeInput"
import MatrixInput from "../components/matrixInput"
import NavigationButtons from "../components/navigationButtons"

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
