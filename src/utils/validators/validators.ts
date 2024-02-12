export const required = (value: string) => {
  if (value) { //если мы ввели какое-то значение, то поле валидное
    return undefined;
  } else {
    return 'Field is required'; //если поле пустой - вернуть текст с ошибкой
  }
}

export const maxLenghtCreator = (maxLength: number) => { //делаем обертку над валидатором длины строки
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