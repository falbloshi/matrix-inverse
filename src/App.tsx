import { MathJaxContext } from "better-react-mathjax"
import Navbar from "./components/navbar"
import HeroPage from "./components/heroPage"
import InputPage from "./components/inputPage"
import ResultPage from "./components/resultPage"
import { useAppContext } from "./context/AppContext"
import { motion as m } from "framer-motion"

import { slideFromLeftSpringy } from "./animations"


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
        {currentPage === "Home" &&
          <m.div
            initial="hidden"
            animate="show"
            variants={slideFromLeftSpringy}
          >
            <HeroPage />
          </m.div>
        }
        {currentPage === "Input" &&
          <m.div
            initial="hidden"
            animate="show"
            variants={slideFromLeftSpringy}
          >
            <InputPage />
          </m.div>}
        {currentPage == "Result" && <m.div
          initial="hidden"
          animate="show"
          variants={slideFromLeftSpringy}
        >
          <ResultPage />
        </m.div>}
      </main>
    </MathJaxContext >
  )
}
