import { MathJaxContext } from "better-react-mathjax"
import Navbar from "./components/navbar"
import HeroPage from "./components/heroPage"
import InputPage from "./components/inputPage"
import ResultPage from "./components/resultPage"
import { useAppContext } from "./context/AppContext"


const config = {
  loader: { load: ["input/tex", "output/svg"] },
  tex: {
    inlineMath: [
      ["$", "$"],
      ["\\(", "\\)"],
    ],
    displayMath: [
      ["$$", "$$"],
      ["\\[", "\\]"],
    ],
  },
  svg: {
    scale: 3.0,
  },
}

export default function Home() {
  const { currentPage } = useAppContext()

  return (
    <MathJaxContext config={config}>
      <Navbar />
      <main>
        {currentPage === "Home" && <HeroPage />}
        {currentPage === "Input" && <InputPage />}
        {currentPage == "Result" && <ResultPage />}
      </main>
    </MathJaxContext>
  )
}
