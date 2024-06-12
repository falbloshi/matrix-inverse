import Hero from "./hero"
import { Page, PageDirection } from "../utils/types"

interface HeroPageProps {
  navigate: (currentPage: Page, direction: PageDirection) => void
  currentPage: Page
}

const HeroPage: React.FC<HeroPageProps> = ({ navigate, currentPage }) => {
  return (
    <div>
      <Hero
        navigate={navigate}
        currentPage={currentPage}
      />
    </div>
  )
}

export default HeroPage
