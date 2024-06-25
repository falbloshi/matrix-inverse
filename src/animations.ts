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
