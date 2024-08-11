import { useAppContext } from "../../context/AppContext"
import gaussElimination from "../../utils/math/gaussElimination"
import matrixWithRowOpsDisplay from "../../utils/matrixWithRowOpsDisplay"
import KatexComponent from "./katexComponent";
import 'katex/dist/katex.min.css'

const ReturnDisplayResult = () => {
  const { inputs } = useAppContext()

  if (inputs) {
    const matrix = matrixWithRowOpsDisplay(gaussElimination(inputs) as any[])

    if (matrix) {
      return matrix.map((element, index) => (
        <div key={index}>
          {index > 0 && <p className="font-serif">{index}. </p>}
          <div className="text-4xl">
            <KatexComponent math={element} />
          </div>
        </div>
      ))
    } else return null
  } else return null
}

export default ReturnDisplayResult
