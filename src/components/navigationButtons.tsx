import { useAppContext } from "../context/AppContext"

const NavigationButtons = () => {
  const { currentPage, handleNavigate } = useAppContext()

  return (
    <div className="join grid grid-cols-2 my-16">
      <button
        onClick={() => handleNavigate(currentPage, "previous")}
        className="join-item btn btn-outline">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="size-6">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
          />
        </svg>
        Previous Page
      </button>
      <button
        onClick={() => handleNavigate(currentPage, "next")}
        className="join-item btn btn-outline">
        Next Page
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="size-6">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
          />
        </svg>
      </button>
    </div>
  )
}

export default NavigationButtons
