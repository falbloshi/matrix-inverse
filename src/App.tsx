import Navbar from "./components/navbar"
import { MathJaxContext } from "better-react-mathjax"
import InputPage from "./components/inputPage"

const config = {
  loader: { load: ["input/asciimath"] },
  asciimath: {
    displaystyle: true,
    delimiters: [
      ["$", "$"],
      ["`", "`"],
    ],
  },
}

export default function Home() {
  return (
    <MathJaxContext config={config}>
      <main className="mx-16">
        <Navbar />
        <InputPage />
      </main>
    </MathJaxContext>
  )
}
