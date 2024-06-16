const serializeState = (state: string[]) => {
  return state
    .map((value) => {
      return encodeURIComponent(value)
    })
    .join("&")
}

const deserializeState = (queryString: string): string[] => {
  return queryString.split("&").map((value) => decodeURIComponent(value))
}

export { serializeState, deserializeState }
