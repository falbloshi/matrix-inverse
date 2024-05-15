import createMatrixElement from "./createMatrixElement"
import { Fraction } from "./types"

export default function StringToNumbers(list: string[]): Fraction[] {
  const result = list.map((element) => {
    if (element.length < 3) return createMatrixElement(parseInt(element) * 1)

    const [num, denum] = element.split("/").map((num) => parseInt(num) * 1)

    if (denum === 0 || denum === 1) return createMatrixElement(num)

    return createMatrixElement(num, denum)
  })
  return result
}
