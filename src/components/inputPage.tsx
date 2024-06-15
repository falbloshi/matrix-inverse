import SizeInput from "./sizeInput"
import MatrixInput from "./matrixInput"
import { Page } from "../utils/types"

interface InputPageProps {
  value: number
  inputs: string[]
  display: string | null
  currentPage: Page
  setValue: (value: number) => void
  setInputs: (inputs: string[]) => void
  setDisplay: (display: string | null) => void
  navigate: (currentPage: Page, direction: "next" | "previous") => void
}

const InputPage: React.FC<InputPageProps> = ({
  value,
  setValue,
  inputs,
  setInputs,
  display,
  setDisplay,
  currentPage,
  navigate,
}) => {
  return (
    <>
      <SizeInput
        value={value}
        setValue={setValue}
      />
      <MatrixInput
        value={value}
        inputs={inputs}
        setInputs={setInputs}
        display={display}
        setDisplay={setDisplay}
      />
      <div className="my-16">
        <button
          onClick={() => navigate(currentPage, "previous")}
          className="mr-4 px-4 py-2 font-pt-sans text-2xl text-white bg-blue-500 rounded hover:bg-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50">
          {`< Previous Page`}
        </button>
        <button
          onClick={() => navigate(currentPage, "next")}
          className="ml-4 px-4 py-2 font-pt-sans text-2xl text-white bg-blue-500 rounded hover:bg-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50">
          {`Next Page >`}
        </button>
      </div>
    </>
  )
}

export default InputPage
