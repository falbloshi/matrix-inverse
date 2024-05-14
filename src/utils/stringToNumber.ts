function StringToNumbers(list: string[]): number[][] {
  const result = list.map((element) => {
    if (element.length < 3) return [parseInt(element) * 1]

    const [numerator, denumerator] = element
      .split("/")
      .map((num) => parseInt(num) * 1)

    if (denumerator === 0 || denumerator === 1) return [numerator]

    return [numerator, denumerator]
  })
  return result
}

export default StringToNumbers
