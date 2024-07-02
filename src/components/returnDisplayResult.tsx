import { useAppContext } from "../context/AppContext"
import { MathJax } from "better-react-mathjax"
import gaussElimination from "../utils/math/gaussElimination"
import matrixWithRowOpsDisplay from "../utils/matrixWithRowOpsDisplay"

const ReturnDisplayResult = () => {
  const { inputs } = useAppContext()
  let matrix: any[] | null

  if (inputs) {
    matrix = matrixWithRowOpsDisplay(gaussElimination(inputs) as any[])

    if (matrix) {
      return matrix.map((element, index) => (
        <div key={index}>
          {index > 0 && <p className="font-serif">{index}. </p>}
          <MathJax>{`$$${element}$$`}</MathJax>
        </div>
      ))
    } else return null
  } else return null
}

export default ReturnDisplayResult
