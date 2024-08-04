import { motion as m } from "framer-motion"
import { alertMessagePopInAndOut } from "../../utils/animations"

interface InputErrorsProps {
  error: string
}

const InputErrors: React.FC<InputErrorsProps> = ({ error }) => {
  return (
    <m.div role="alert" className="alert alert-error w-fit my-4"
      initial="hidden"
      animate="popIn"
      exit="popOut"
      variants={alertMessagePopInAndOut}
    ><svg xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="size-8">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
      </svg>{error}</m.div>
  )
}

export default InputErrors