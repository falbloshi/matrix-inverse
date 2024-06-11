const reduceRationalForDisplay = (element: string) => {
  if (!element.includes("/")) return element
  
  let [num, den] = element.split("/")
  return `\\frac{${num}}{${den}}`
}

export default reduceRationalForDisplay
