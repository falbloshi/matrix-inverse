import Navbar from "./components/components/navbar"
import HeroPage from "./components/pages/heroPage"
import InputPage from "./components/pages/inputPage"
import ResultPage from "./components/pages/resultPage"
import { useAppContext } from "./context/AppContext"
import { motion as m } from "framer-motion"

import { slideFromLeftSpringy } from "./utils/animations"


export default function Home() {
  const { currentPage } = useAppContext()

  return (
    <>
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
    </>

  )
}
