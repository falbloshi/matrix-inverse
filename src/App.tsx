import { useEffect, useState } from "react"
import { MathJaxContext } from "better-react-mathjax"
import Navbar from "./components/navbar"
import HeroPage from "./components/heroPage"
import InputPage from "./components/inputPage"
import ResultPage from "./components/resultPage"
import { serializeState } from "./utils/stateSerializer"
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
    scale: 3.0
  }
}

export default function Home() {
  const [serializedState, setSerializedState] = useState<string>("")

  const { inputs, currentPage } = useAppContext()


  useEffect(() => {
    setSerializedState(serializeState(inputs))
    const serializedStateValues = serializeState(inputs)

    window.history.pushState({}, '', `?${serializedStateValues}`)
    setSerializedState(serializedStateValues)
  }, [inputs])


  return (
    <MathJaxContext config={config}>
      <main className="mx-16">
        <Navbar />
        {currentPage === "heroPage" && (
          <HeroPage />
        )}
        {currentPage === "inputPage" && (
          <InputPage />
        )}
        {currentPage == "resultPage" && (
          <ResultPage />
        )}
      </main>
    </MathJaxContext>
  )
}
