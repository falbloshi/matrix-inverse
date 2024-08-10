import Title from "./title"
import { useAppContext } from "../../context/AppContext"
import { BlockMath } from 'react-katex';
import 'katex/dist/katex.min.css'

const Hero = () => {

  const { handleNavigate, currentPage } = useAppContext()
  return (

    <div className="flex mx-48 my-32 items-start justify-start">
      <div className="flex flex-col items-start max-w-[768px] gap-16">
        <Title />

        <p className="paragraph">Here, we can use this progressive  web app to find the inverse of a square matrix</p>

        <button onClick={() => handleNavigate(currentPage, "next")} className="btn btn-secondary text-2xl font-inter font-black"><span className="text-[#333]">TRY IT NOW!</span></button>
      </div>

      <div className="text-7xl text-base-300 ml-64">
        <BlockMath>{`\\begin{bmatrix} 1 & 0 & 0 \\\\ 0 & 1 & 0 \\\\ 0 & 0 & 1 \\end{bmatrix}`}</BlockMath>
      </div>
    </div>
  )
}

export default Hero


