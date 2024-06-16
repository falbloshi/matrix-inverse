import Title from "./title"
import { useAppContext } from "../context/AppContext"

// interface HeroProps {
//   setCurrentPage: (currentPage: Page, direction: "next" | "previous") => void
//   currentPage: Page
// }

const Hero: React.FC = () => {

  const { handleNavigate, currentPage } = useAppContext()
  return (
    <div className="flex mt-16 gap-72 mx-64">
      <Title />
      <div className="px-12 mt-4 bg-neutral-100 py-8 rounded-xl drop-shadow-2xl  ">
        <p className={`font-pt-sans text-4xl text-justify leading-snug`}>
          Welcome to the Inverse Matrix. Here you can use the app to find the
          inverse of a square matrix.
        </p>
        <button
          onClick={() => handleNavigate(currentPage, "next")}
          className="mt-8 font-pt-sans font-bold text-neutral-100 text-3xl rounded-3xl bg-neutral-400  py-4 px-12 drop-shadow-md hover:bg-neutral-200 hover:text-neutral-400">
          Try It Now!
        </button>
      </div>
    </div>
  )
}

export default Hero
