import { Rational } from "./types"

export default function stringToMatrixElements(list: string[]): Rational[] {
  const result = list.map((element) => {
    if (element.length < 3) return { num: parseInt(element) * 1, den: 1 }

    const [num, den] = element.split("/").map((num) => parseInt(num) * 1)

    if (den === 0 || den === 1) return { num: num, den: 1 }

    return { num, den }
  })
  return result
}
