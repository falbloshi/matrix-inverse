import SizeInput from "./sizeInput"
import MatrixInput from "./matrixInput"
import { useAppContext } from "../context/AppContext"

const InputPage = () => {

  const { currentPage, handleNavigate } = useAppContext()

  return (
    <>
      <SizeInput />
      <MatrixInput />
      <div className="my-16">
        <button
          onClick={() => handleNavigate(currentPage, "previous")}
          className="nav-btn">
          {`< Previous Page`}
        </button>
        <button
          onClick={() => handleNavigate(currentPage, "next")}
          className="nav-btn">
          {`Next Page >`}
        </button>
      </div>
    </>
  )
}

export default InputPage
