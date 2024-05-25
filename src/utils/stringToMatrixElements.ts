import { Rational } from "./types"

export default function stringToMatrixElements(list: string[]): Rational[] {
  return list.map((element) => {
    if (!element.includes("/")) {
      return { num: parseInt(element, 10), den: 1 }
    }

    const [num, den] = element.split("/").map((num) => parseInt(num, 10))
    return { num, den: den === 0 ? 1 : den }
  })
}
