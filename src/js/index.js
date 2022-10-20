'use strict'
import { getStore, setStore, delItemStore, delItemsStore } from './store.js'
import { getElem, getElemAll } from './getter'
import { createDate, countTotal, addCard, addCards, getIdCard } from './actions'
import { createObj } from './render'
import validate from './validate.js'

// --Check localStorage--
const CARDS_WRAP = getElemAll('.items__cards')
const TOTAL = getElemAll('.item__total--count')

const ARR_CARDS = getStore('cards')
if (ARR_CARDS) {
  addCards(ARR_CARDS, CARDS_WRAP)
}

countTotal(TOTAL, ARR_CARDS)

// Remove one card
for (let btn of getElemAll('.card__delete')) {
  btn.addEventListener('click', () => {
    delItemStore('cards', getStore('cards'), btn.getAttribute('data-id'))
    countTotal(TOTAL, getStore('cards'))

    btn.closest('.card').remove()
  })
}

//Remove all cards
const BTN_DELETE_ALL = getElemAll('.item__del')

for (let i = 0; i < BTN_DELETE_ALL.length; i++) {
  BTN_DELETE_ALL[i].addEventListener('click', () => {
    let cardArr = getStore('cards')

    if (cardArr) {
      delItemsStore('cards', cardArr, i)

      getElemAll(`.card[data-status="${i}"]`).forEach((card) => {
        card.remove()
      })

      countTotal(TOTAL, getStore('cards'))
    }
  })
}
// --/Check localStorage--

// --Add current date--
const DATE = document.querySelector('.date')
DATE.textContent = createDate()
// --/Add current date--

// --Open form--
const BTN_POPUP_SHOW = getElem('.item__add')

BTN_POPUP_SHOW.addEventListener('click', () => {
  getElem('.popup').classList.remove('active')
  window.scrollTo(0, 0)
  document.body.style.overflow = 'hidden'

  getElemAll('.popup__form input').forEach((elem) => {
    elem.value = ''
  })
  getElem('.popup__form textarea').value = ''
})
// --/Open form--

// Close form
const BTN_POPUP_CLOSE = getElem('.popup__close')
const BTN_POPUP_CANSEL = getElem('.popup__form--cansel')

BTN_POPUP_CLOSE.addEventListener('click', () => {
  getElem('.popup').classList.add('active')
  document.body.style.overflow = ''
})
BTN_POPUP_CANSEL.addEventListener('click', (ev) => {
  ev.preventDefault()
  getElem('.popup').classList.add('active')
  document.body.style.overflow = ''
})
// --/Close form--

// --Create card--
const BTN_POPUP_CREATE = getElem('.popup__form--create')

BTN_POPUP_CREATE.addEventListener('click', (ev) => {
  ev.preventDefault()

  // Render card object
  let title = getElem('.popup__form--title input')
  let text = getElem('.popup__form--description textarea')
  let author = getElem('.popup__form--author input')

  // Check validation form
  let formValid = validate(title, text, author)
  if (formValid) {
    throw new Error('Form is not valid')
  }

  let date = createDate()
  let status = 0 //status: maketodo - 0, inprogress - 1, done - 2
  let id

  let cardsArr = getStore('cards')
  if (cardsArr) {
    id = getIdCard(cardsArr)
  } else {
    id = 0
  }

  let cardObj = new createObj(
    title.value,
    text.value,
    author.value,
    date,
    id,
    status
  )

  // Save in localStorage
  if (cardsArr) {
    cardsArr.push(cardObj)
    setStore('cards', cardsArr)
  } else {
    cardsArr = []
    cardsArr.push(cardObj)
    setStore('cards', cardsArr)
  }

  // Add cards to DOM
  addCard(cardObj, CARDS_WRAP)

  //Card remove
  for (let btn of getElemAll('.card__delete')) {
    btn.addEventListener('click', () => {
      delItemStore('cards', getStore('cards'), btn.getAttribute('data-id'))

      btn.closest('.card').remove()
      countTotal(TOTAL, getStore('cards'))
    })
  }

  // drag start
  cards = getElemAll('.card')
  cards.forEach(function (elem, index) {
    elem.addEventListener('dragstart', function (event) {
      event.dataTransfer.setData('item', index)
    })
  })

  // count total
  countTotal(TOTAL, cardsArr)

  getElem('.popup').classList.add('active')
  document.body.style = ''
})
// --/Create card--

// --Dragdrop--
let cards = getElemAll('.card')

// Save data of card
cards.forEach(function (elem, index) {
  elem.addEventListener('dragstart', function (event) {
    event.dataTransfer.setData('item', index)
  })
})

for (let i = 0; i < CARDS_WRAP.length; i++) {
  // If the card is located in the zone parentBlock
  CARDS_WRAP[i].addEventListener('dragover', function (event) {
    event.dataTransfer.dropEffect = 'move'
    event.preventDefault()
  })

  // Drop card
  CARDS_WRAP[i].addEventListener('drop', function (event) {
    let item = cards[event.dataTransfer.getData('item')]
    this.appendChild(item)

    //Change status
    let arrCard = getStore('cards')
    for (let objCard of arrCard) {
      if (objCard.id == item.dataset.id) {
        objCard.status = i
        item.dataset.status = i
      }
    }
    //Update store
    setStore('cards', arrCard)
    // Count total
    countTotal(TOTAL, arrCard)
  })
}
// --/Dragdrop--
