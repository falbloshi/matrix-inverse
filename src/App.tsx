import { useState } from "react"
import { MathJaxContext } from "better-react-mathjax"
import pageNavigation from "./utils/pageNavigation"
import Navbar from "./components/navbar"
import HeroPage from "./components/heroPage"
import InputPage from "./components/inputPage"
import ResultPage from "./components/resultPage"
import { Page, PageDirection } from "./utils/types"

const config = {
  loader: { load: ["input/tex"] },
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
}

export default function Home() {
  const [value, setValue] = useState<number>(2)
  const [inputs, setInputs] = useState<string[]>([])
  const [display, setDisplay] = useState<string>("pending")
  const [currentPage, setCurrentPage] = useState<Page>("heroPage")

  const handleNavigate = (currentPage: Page, direction: PageDirection) => {
    const nextPage = pageNavigation(currentPage, direction)
    setCurrentPage(nextPage)
  }

  return (
    <MathJaxContext config={config}>
      <main className="mx-16">
        <Navbar />
        {currentPage === "heroPage" && (
          <HeroPage
            navigate={handleNavigate}
            currentPage={currentPage}
          />
        )}
        {currentPage === "inputPage" && (
          <InputPage
            navigate={handleNavigate}
            currentPage={currentPage}
            value={value}
            setValue={setValue}
            inputs={inputs}
            setInputs={setInputs}
            display={display}
            setDisplay={setDisplay}
          />
        )}
        {currentPage == "resultPage" && (
          <ResultPage
            navigate={handleNavigate}
            currentPage={currentPage}
            inputs={inputs}
            display={display}
          />
        )}
      </main>
    </MathJaxContext>
  )
}
