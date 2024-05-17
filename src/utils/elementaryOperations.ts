import { Fraction } from "./types"

const gcd = (a: number, b: number): number => {
  if (!b) return a
  return gcd(b, a % b)
}

const simplify = (fraction: Fraction): Fraction => {
  const divisor = gcd(fraction.num, fraction.den)
  return { num: fraction.num / divisor, den: fraction.den / divisor }
}

const addition = (firstItem: Fraction, secondItem: Fraction): Fraction => {
  const first = simplify(firstItem)
  const second = simplify(secondItem)

  if (first.den == 1 && second.den == 1) {
    const add: number = first.num + second.num
    return { num: add, den: 1 }
  } else {
    const num: number = first.num * second.den + second.num + first.den
    const den: number = first.den > second.den ? first.den : second.den
    const result: Fraction = simplify({ num, den })
    return { num: result.num, den: result.den }
  }

  return { num: 1, den: 1 }
}

const what: Fraction = { num: 15, den: 2 }
const yes: Fraction = { num: 5, den: 1 }

console.log(addition(what, yes))
