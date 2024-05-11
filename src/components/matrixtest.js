const list = ["1", "2", "5", "6/2"]

const mathJaxElements = (size, input) => {
  let result = "["
  for (let i = 0; i < size / 2; i++) {
    let row = "["
    for (let j = 0; j < size / 2; j++) {
      let element = input[(i * size) / 2 + j]
      if (j == 0 && i == 0) {
        row += element
      } else if (j == 0) {
        row += "," + element
      } else {
        row += "," + element
      }
    }
    row += "]"
    if (i < size / 2 - 1) {
      result += row + ","
    } else {
      result += row
    }
  }
  result += "]"
  return result
}

const final = mathJaxElements(list.length, list)
console.log(final)
