import Navbar from "@/components/navbar"
import Hero from "@/components/hero"
import SizeInput from "@/components/sizeinput"
import MatrixInput from "@/components/matrixinput"
import { MathJaxContext } from "better-react-mathjax"

export default function Home() {
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

  return (
    <MathJaxContext config={config}>
      <main className="mx-16">
        <Navbar />
        <Hero />
        <SizeInput />
        <MatrixInput />
      </main>
    </MathJaxContext>
  )
}
