export const setItem = (key, data) => {
  localStorage.setItem(key, JSON.stringify(data))
}

export const getItem = (key) => {
  const data = localStorage.getItem(key)
  if (data) {
    return JSON.parse(data)
  } else {
    return null
  }
}