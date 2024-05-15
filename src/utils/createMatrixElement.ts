import { Fraction } from "./types"

export default function createMatrixElement(
  num: number,
  den: number = 1
): Fraction {
  return { num, den }
}
