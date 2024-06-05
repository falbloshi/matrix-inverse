import { Rational } from "./types"

export default function stringToMatrixElements(
  list: string[]
): Rational[] | null {
  const rationalList = list.map((element) => {
    if (!element.includes("/")) {
      const num = parseInt(element, 10)
      if (isNaN(num)) return null
      return { num: num, den: 1 }
    }

    const [num, den] = element.split("/").map((num) => parseInt(num, 10))

    if (isNaN(num) || isNaN(den)) return null

    return { num, den: den === 0 ? 1 : den }
  })

  if (rationalList.some((element) => element === null)) return null
  return rationalList as Rational[]
}
