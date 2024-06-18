import { Page, PageDirection } from "./types"

const pageNavigation = (currentPage: Page, direction: PageDirection) => {
  const pages: Page[] = ["Home", "Input", "Result"]

  const currentIndex = pages.indexOf(currentPage)

  let newIndex: number

  newIndex =
    direction == "next"
      ? (currentIndex + 1) % pages.length
      : (currentIndex - 1 + pages.length) % pages.length

  return pages[newIndex]
}
export default pageNavigation
