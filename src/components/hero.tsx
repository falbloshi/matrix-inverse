import Title from "./title"
import { useAppContext } from "../context/AppContext"
import { MathJax } from "better-react-mathjax"

const Hero = () => {

  const { handleNavigate, currentPage } = useAppContext()
  return (

    <div className="flex mx-48 my-32 items-start justify-start">
      <div className="flex flex-col items-start max-w-[768px] gap-16">
        <Title />

        <p className="paragraph">Here, we can use this progressive  web app to find the inverse of a square matrix</p>

        <button onClick={() => handleNavigate(currentPage, "next")} className="btn btn-secondary text-2xl font-inter font-black"><span className="text-base-100">TRY IT NOW!</span></button>
      </div>

      <MathJax className="text-3xl text-base-200 ml-64">{`\\begin{bmatrix} 1 & 0 & 0 \\\\ 0 & 1 & 0 \\\\ 0 & 0 & 1 \\end{bmatrix}`}</MathJax>
    </div>
  )
}

export default Hero


