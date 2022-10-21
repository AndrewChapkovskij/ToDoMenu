export default function validate({ title, text, author }) {
  let flag = false

  let regTitle = /^[a-z0-9_-]{3,90}$/
  let regText = /^[a-z0-9_-]{10,250}$/
  let regAuthor = /^[a-z0-9_-]{3,25}$/

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
  let mistake = place.previousElementSibling
  if (!reg.test(place.value)) {
    mistake.textContent = text
    changeFlag()
  } else {
    mistake.textContent = ''
  }
}
