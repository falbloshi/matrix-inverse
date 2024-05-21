import { Rational } from "../types"

export default function createMatrixElement(
  num: number,
  den: number = 1
): Rational {
  return { num, den }
}
