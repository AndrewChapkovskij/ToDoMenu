'use strict'
import { getStore, setStore } from './store.js'
import { getElem, getElemAll } from './getter'
import { createDate, countTotal, addCard, addCards, getIdCard } from './actions'
import { createObj } from './render'
import validate from './validate.js'
import { setBtnRemove, setBtnRemoveAll } from './remove.js'
import {
  toggleForm,
  FORM_CREATE,
  FORM_CLOSE,
  FORM_CANSEL,
  FORM_OBJ,
} from './form.js'
import { startDrag, dropDrag } from './dragdrop.js'

// --Check localStorage--
const CARDS_WRAP = getElemAll('.items__cards')
const ARR_CARDS = getStore('cards')
const TOTAL = getElemAll('.item__total--count')

if (ARR_CARDS) {
  addCards(ARR_CARDS, CARDS_WRAP)
}
// Count quantity
countTotal(TOTAL, ARR_CARDS)
// Remove one card
setBtnRemove(TOTAL)
//Remove all cards
setBtnRemoveAll(TOTAL)
// --/Check localStorage--

// --Add current date--
const DATE = document.querySelector('.date')
DATE.textContent = createDate()
// --/Add current date--

// --Open form--
const FORM_SHOW = getElem('.item__add')

FORM_SHOW.addEventListener('click', () => {
  toggleForm('hidden')
  window.scrollTo(0, 0)

  for (let key in FORM_OBJ) {
    FORM_OBJ[key].value = ''
  }
})
// --/Open form--

// --Close form--
FORM_CLOSE.addEventListener('click', () => {
  toggleForm('')
})
FORM_CANSEL.addEventListener('click', (ev) => {
  ev.preventDefault()
  toggleForm('')
})
// --/Close form--

// --Create card--
FORM_CREATE.addEventListener('click', (ev) => {
  ev.preventDefault()
  // Check validation form
  let formValid = validate(FORM_OBJ)
  if (formValid) {
    throw new Error('Form is not valid')
  }
  // Create cardObj
  let status = 0 //status: maketodo - 0, inprogress - 1, done - 2
  let id

  let cardsArr = getStore('cards')
  if (cardsArr) {
    id = getIdCard(cardsArr)
  } else {
    id = 0
  }
  let cardObj = new createObj(FORM_OBJ, createDate(), id, status)

  // Save in localStorage
  if (cardsArr) {
    cardsArr.push(cardObj)
    setStore('cards', cardsArr)
  } else {
    setStore('cards', [cardObj])
  }

  // Add cards to DOM
  addCard(cardObj, CARDS_WRAP)
  //Add event cardRemove
  setBtnRemove(TOTAL)
  // Drag start
  startDrag()
  // count total
  countTotal(TOTAL, cardsArr)
  //Close form
  toggleForm('')
})
// --/Create card--

// --Dragdrop--
startDrag()
dropDrag(CARDS_WRAP, TOTAL)
// --/Dragdrop--
