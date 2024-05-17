import { Fraction } from "./types"

/*

*/

const gcd = (a: number, b: number): number => {
  if (!b) return a
  return gcd(b, a % b)
}

const simplify = (fraction: Fraction): Fraction => {
  const divisor = Math.abs(gcd(fraction.num, fraction.den))
  return {
    num: fraction.num / divisor,
    den: fraction.den / divisor,
  }
}

const addition = (firstItem: Fraction, secondItem: Fraction): Fraction => {
  const first = simplify(firstItem)
  const second = simplify(secondItem)

  //since numerators are already negative, no need for the denum to be
  const absFirstDen = Math.abs(first.den)
  const absSecondDen = Math.abs(second.den)

  if (absFirstDen == absSecondDen) {
    const add = first.num + second.num
    return simplify({ num: add, den: absSecondDen })
  } else {
    const num = first.num * absSecondDen + second.num * absFirstDen
    const den = absFirstDen > absSecondDen ? absFirstDen : absSecondDen

    const result: Fraction = simplify({ num, den })

    return { num: result.num, den: result.den }
  }
}
const what: Fraction = { num: -14, den: 2 }
const yes: Fraction = { num: 5, den: 2 }

console.log(addition(what, yes))
