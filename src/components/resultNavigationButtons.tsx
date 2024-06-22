interface ResultNavigationButtonProps {
  first: () => void
  last: () => void
  next: () => void
  prev: () => void
  current: number
  indexSize: number
}

const ResultNavigationButtons: React.FC<ResultNavigationButtonProps> = ({
  first,
  last,
  next,
  prev,
  current,
  indexSize,
}) => {
  return (
    <div className="join join-vertical">
      <button
        onClick={first}
        className="btn join-item">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-6">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m4.5 18.75 7.5-7.5 7.5 7.5"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m4.5 12.75 7.5-7.5 7.5 7.5"
          />
        </svg>
        Restart
      </button>
      <button
        onClick={prev}
        className="btn btn-primary join-item">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-6">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m4.5 15.75 7.5-7.5 7.5 7.5"
          />
        </svg>
        Prev
      </button>
      <button className="btn join-item">
        {current === 0
          ? "Start"
          : current === indexSize
          ? "Result"
          : `Step ${current}`}
      </button>
      <button
        onClick={next}
        className="btn btn-primary join-item">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-6">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m19.5 8.25-7.5 7.5-7.5-7.5"
          />
        </svg>
        Next
      </button>
      <button
        onClick={last}
        className="btn join-item">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-6">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m4.5 5.25 7.5 7.5 7.5-7.5m-15 6 7.5 7.5 7.5-7.5"
          />
        </svg>
        Result
      </button>
    </div>
  )
}
export default ResultNavigationButtons
