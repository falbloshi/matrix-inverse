"use client"
import { MathJax } from "better-react-mathjax"

const MatrixInput = () => {
  return (
    <div>
      <MathJax>
        <p>{"`frac(10)(4x) approx 2^(12)`"}</p>
      </MathJax>
    </div>
  )
}
export default MatrixInput
