const list = ["1", "-2/3", "4/5", "-9", "3/0"]

function StringToNumbers(list) {
  let result
  result = list.map(element => {
    if (element.length === 1) return [parseInt(element[0])]
    element.split("/")
    const numerator = parseInt(element[1]) * 1
    const denumerator = (parseInt(element[2]) * 1) | 1

    return [numerator, denumerator]
  })
  console.log(result)
  return result
}

console.log(StringToNumbers(list))
