const mathJaxElements = (length, input) => {
  const size = Math.sqrt(length)
  let result = "["
  for (let i = 0; i < size; i++) {
    let row = "["
    for (let j = 0; j < size; j++) {
      let element = input[i * size + j]
      row += element
      if (j < size - 1) {
        row += ","
      }
    }
    row += "]"
    if (i < size - 1) {
      result += row + ","
    } else {
      result += row
    }
  }
  result += "]"
  return result
}
