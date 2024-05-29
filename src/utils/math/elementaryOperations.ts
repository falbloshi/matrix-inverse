import { Rational, Operation } from "../types"

//find greatest common denumerator
const gcd = (num: number, den: number): number => {
  if (!den) return num
  return gcd(den, num % den)
}

//simplifying rational terms
const simplify = (number: Rational): Rational => {
  let { num, den } = number

  if (num === 0) return { num: 0, den: 1 }

  if (den < 0) {
    num = -num
    den = -den
  }

  const divisor = Math.abs(gcd(number.num, number.den))
  return {
    num: num / divisor,
    den: den / divisor,
  }
}

const elementaryOperations = <T extends Operation>(
  operation: T,
  firstNumber: Rational,
  secondNumber: Rational
): Rational => {
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

  return firstNumber
}

const addition = (first: Rational, second: Rational): Rational => {
  const num = first.num * second.den + second.num * first.den
  const den = first.den * second.den

  return simplify({ num, den })
}

const subtraction = (first: Rational, second: Rational): Rational => {
  const num = first.num * second.den - second.num * first.den
  const den = first.den * second.den

  return simplify({ num, den })
}

const multiplication = (first: Rational, second: Rational): Rational => {
  return simplify({ num: first.num * second.num, den: first.den * second.den })
}

const division = (first: Rational, second: Rational): Rational => {
  let num = first.num * second.den
  let den = first.den * second.num

  return simplify({
    num: num,
    den: den,
  })
}

export default elementaryOperations
