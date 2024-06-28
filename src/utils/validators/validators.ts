export const required = (value: string) => {
  if (value) {
    return undefined;
  } else {
    return 'Field is required';
  }
}

export const maxLenghtCreator = (maxLength: number) => {
  return (value: string) => {
    if (value && value.length > maxLength) {
      return 'Text is too long'
    } else {
      return undefined
    }
  }
}

export const minLengthCreator = (minLenght: number) => {
  return (value: string) => {
    if (value && value.length < 6) {
      return 'Password is too short. Min 6 symbols'
    } else {
      return undefined;
    }
  }
}