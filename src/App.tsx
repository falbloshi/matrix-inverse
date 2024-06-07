import Navbar from "./components/navbar"
import { MathJaxContext } from "better-react-mathjax"
import InputPage from "./components/inputPage"
import { useState } from "react"
import ResultPage from "./components/resultPage"

// const config = {
//   loader: { load: ["input/asciimath"] },
//   asciimath: {
//     displaystyle: true,
//     delimiters: [
//       ["$", "$"],
//       ["`", "`"],
//     ],
//   },
// }

const config = {
  loader: { load: ["input/tex"] },
  tex: {
    inlineMath: [["$", "$"], ["\\(", "\\)"]],
    displayMath: [["$$", "$$"], ["\\[", "\\]"]]
  },
}

export default function Home() {

  const [value, setValue] = useState<number>(2)
  const [inputs, setInputs] = useState<string[]>([])

  return (
    <MathJaxContext config={config}>
      <main className="mx-16">
        <Navbar />
        <InputPage value={value} setValue={setValue} inputs={inputs} setInputs={setInputs} />
        <ResultPage inputs={inputs} />
      </main>
    </MathJaxContext>
  )
}
