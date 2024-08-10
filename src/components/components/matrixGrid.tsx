import { useAppContext } from "../../context/AppContext"
import { motion as m } from "framer-motion"
import { inputContainer, inputPopIn } from "../../utils/animations"
import { useEffect } from "react"

interface MatrixGridProps {
  errorIndices: number[]
}
const MatrixGrid: React.FC<MatrixGridProps> = ({
  errorIndices,
}) => {
  const { inputs, setInputs, matrixSize, query, setQuery } = useAppContext()

  useEffect(() => {
    console.log("true, we reached here")
    const urlParams = new URLSearchParams(window.location.search).get("inputs")

    if (urlParams) {
      console.log(urlParams)
      setInputs(urlParams.split(" "))
    }
  }, [setInputs])

  const handleInputChange =
    (index: number) => (event: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = event.target.value
      const newInputs = [...inputs]
      newInputs[index] = newValue
      setInputs(newInputs)
    }


  useEffect(() => {
    if (inputs.every((item) => item === '')) return
    setQuery(inputs.join(" "))
  }, [inputs, setQuery])

  useEffect(() => {
    const url = new URL(window.location.href)
    url.searchParams.set("inputs", query)
    window.history.pushState({}, "", url)
  }, [query])


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
            value={inputs[index] || ""}
            onChange={handleInputChange(index)}
            className={`grid-items ${errorCSS}}`}
          />
        )
      })}
    </m.div>
  ))
}

export default MatrixGrid
