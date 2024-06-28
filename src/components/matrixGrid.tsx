import { useAppContext } from "../context/AppContext"
import { motion as m } from "framer-motion"
import { inputContainer, inputPopIn } from "../animations"

interface MatrixGridProps {
  handleInputChange: (
    index: number
  ) => (event: React.ChangeEvent<HTMLInputElement>) => void
  errorIndices: number[]
}
const MatrixGrid: React.FC<MatrixGridProps> = ({
  handleInputChange,
  errorIndices,
}) => {
  const { inputs, matrixSize } = useAppContext()

  return Array.from({ length: matrixSize }).map((_, i) => (
    <m.div
      variants={inputContainer}
      initial="hidden"
      animate="visible"
      key={i}
      className={`grid-items-row`}>
      {Array.from({ length: matrixSize }).map((_, j) => {
        const index = i * matrixSize + j
        const errorCSS = errorIndices.includes(index)
          ? "custom-input-error focus:custom-input-error"
          : ""
        return (
          <m.input
            variants={inputPopIn}
            key={index}
            type="text"
            placeholder={`R${i + 1} C${j + 1}`}
            value={inputs[index]}
            onChange={handleInputChange(index)}
            className={`grid-items ${errorCSS}}`}
          />
        )
      })}
    </m.div>
  ))
}

export default MatrixGrid
