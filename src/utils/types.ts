//making whole and natural numbers easier to calculate if they are made into rational number, we will revert back to whole numbers after being done with calculations
export interface Rational {
  num: number
  den: number
}

export interface Matrices {
  invMatrix: Matrix
  idMatrix: Matrix
}

export interface Pivot {
  pivotNum: Rational,
  row: number,
  col: number
}


export type Operation = "add" | "subtract" | "multiply" | "divide"

// a list of list(aka rows) - with each row containing Rational number
export type Matrix = Rational[][]
