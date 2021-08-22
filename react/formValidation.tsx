const formValidation = (email: string): boolean => {
  let valid

  if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email)) {
    valid = false
  } else {
    valid = true
  }

  return valid
}

export default formValidation
