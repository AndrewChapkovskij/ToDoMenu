export default function validate({ title, text, author }) {
  let flag = false

  let regTitle = /^[a-zA-Z][\sa-zA-Z0-9_-]{3,90}$/
  let regText = /^[a-zA-Z][\sa-zA-Z0-9_-]{10,250}$/
  let regAuthor = /^[a-zA-Z][\sa-zA-Z0-9_-]{3,17}$/

  createMistake(
    regTitle,
    title,
    'Title is not correct. Please, enter from 3 to 90 characters',
    () => {
      flag = true
    }
  )
  createMistake(
    regText,
    text,
    'Text is not correct. Please, enter from 10 to 250 characters',
    () => {
      flag = true
    }
  )
  createMistake(
    regAuthor,
    author,
    'Author is not correct. Please, enter from 3 to 25 characters',
    () => {
      flag = true
    }
  )

  return flag
}

function createMistake(reg, place, text, changeFlag) {
  let span = place.previousElementSibling
  if (!reg.test(place.value)) {
    span.textContent = text
    changeFlag()
  } else {
    span.textContent = ''
  }
}
