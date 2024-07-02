export const slideFromLeftSpringy = {
  hidden: { opacity: 0, x: "100%" },
  show: {
    opacity: 1,
    x: "0",
    transition: {
      type: "spring",
      stiffness: 30,
      damping: 10,
      mass: 1.5,
      restSpeed: 0.0001,
      restDistance: 20,
    },
  },
}

export const alertMessagePopInAndOut = {
  hidden: { scale: 0 },
  popIn: {
    scale: 1,
  },
  popOut: {
    scale: 0,
  },
}

export const inputContainer = {
  hidden: { scale: 0 },
  visible: {
    scale: 1,
    transition: { delayChildren: 0.25, staggerChildren: 0.25 },
  },
}

export const inputPopIn = {
  hidden: { scale: 0 },
  visible: { scale: 1 },
}

export const resultSlideIn = {
  hidden: { width: 0, x: -20 },
  visible: {
    width: "100%",
    x: 0,
    transition: {
      ease: "easeOut",
      duration: 0.5,
    },
  },
  exit: {
    scale: 0,
  },
}
