import { useAppContext } from "../context/AppContext"
import ThemeSwapper from "./themeSwapper"

const Navbar = () => {
  const { currentPage } = useAppContext()

  const colorMap: { [key: string]: string } = {
    Home: "bg-secondary",
    Input: "bg-accent",
    Result: "bg-primary",
  }

  const colorClass = colorMap[currentPage] || "bg-primary"

  return (
    <div className={`${colorClass} h-48`}>
      <div className="flex items-end justify-end pt-4 pr-12">
        <ThemeSwapper />
      </div>
      <div className="flex items-center justify-center">
        <h1
          key={currentPage}
          className="opacity-0 animate-fadeIn font-inter font-bold text-7xl text-white tracking-tighter ">
          {`${currentPage.toUpperCase()}`}
        </h1>
      </div>
    </div>
  )
}
export default Navbar
