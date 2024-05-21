import { Rational, Operation } from "../types"

//find greatest common denumerator
const gcd = (num: number, den: number): number => {
  if (!den) return num
  return gcd(den, num % den)
}

//simplifying rational terms
const simplify = (number: Rational): Rational => {
  if (number.den == 1) return number
  const divisor = Math.abs(gcd(number.num, number.den))
  return {
    num: number.num / divisor,
    den: number.den / divisor,
  }
}

const elementaryOperations = <T extends Operation>(
  operation: T,
  firstNumber: Rational,
  secondNumber: Rational
): Rational | null => {
  switch (operation) {
    case "add":
      return addition(firstNumber, secondNumber)
    case "subtract":
      return subtraction(firstNumber, secondNumber)
    case "multiply":
      return multiplication(firstNumber, secondNumber)
    case "divide":
      return division(firstNumber, secondNumber)
  }

  return null
}

const addition = (firstNumber: Rational, secondNumber: Rational): Rational => {
  const first = simplify(firstNumber)
  const second = simplify(secondNumber)

  const absFirstDen = first.den
  const absSecondDen = second.den

  if (absFirstDen == absSecondDen) {
    const add = first.num + second.num
    return simplify({ num: add, den: absFirstDen })
  } else {
    const num = first.num * absSecondDen + second.num * absFirstDen
    const den = absFirstDen * absSecondDen

    return simplify({ num, den })
  }
}

const subtraction = (firstItem: Rational, secondItem: Rational): Rational => {
  const first = simplify(firstItem)
  const second = simplify(secondItem)

  if (first.den == second.den) {
    const add = first.num - second.num
    return simplify({ num: add, den: second.den })
  } else {
    const num = first.num * second.den - second.num * first.den
    const den = first.den * second.den

    return simplify({ num, den })
  }
}

const multiplication = (
  firstItem: Rational,
  secondItem: Rational
): Rational => {
  const first = simplify(firstItem)
  const second = simplify(secondItem)

  return simplify({ num: first.num * second.num, den: first.den * second.den })
}

const division = (firstItem: Rational, secondItem: Rational): Rational => {
  const first = simplify(firstItem)
  const second = simplify(secondItem)

  //flipping denumerator
  const { num, den } = second
  const flippedSecond: Rational = { num: den, den: num }

  //transfer the negative to the numerator
  let numer = first.num * flippedSecond.num
  let denum = first.den * flippedSecond.den

  numer *= Math.abs(denum) === denum ? 1 : -1
  denum = Math.abs(denum)

  return simplify({
    num: numer,
    den: denum,
  })
}

const what: Rational = { num: 5, den: 3 }
const yes: Rational = { num: -4, den: 2 }

console.log(elementaryOperations("add", what, yes))
console.log(elementaryOperations("subtract", what, yes))
console.log(elementaryOperations("multiply", what, yes))
console.log(elementaryOperations("divide", what, yes))

export default elementaryOperations
