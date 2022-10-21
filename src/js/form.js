import { getElem } from './getter'

const FORM = getElem('.popup')

export const FORM_CREATE = getElem('.popup__form--create', FORM)
export const FORM_CLOSE = getElem('.popup__close', FORM)
export const FORM_CANSEL = getElem('.popup__form--cansel', FORM)

// Create object consist of inputs and textarea
export const FORM_OBJ = {}

FORM_OBJ.title = getElem('.popup__form--title input', FORM)
FORM_OBJ.text = getElem('.popup__form--description textarea', FORM)
FORM_OBJ.author = getElem('.popup__form--author input', FORM)

// Function open and close form
export function toggleForm(display) {
  FORM.classList.toggle('active')
  document.body.style.overflow = display
}
