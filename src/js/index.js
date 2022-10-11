import Store from './store.js'
import Card from './card.js'
import { createDate, addCards, getIdCard, countTotal } from './render.js'

// Checking localStorage
const MAIN_WRAP = document.querySelector('#main .wrap')
const ITEMS_CARDS_MAKETODO = MAIN_WRAP.querySelector('.maketodo .items__cards')
const ITEMS_CARDS_INPROGRESS = MAIN_WRAP.querySelector(
  '.inprogress .items__cards'
)
const ITEMS_CARDS_DONE = MAIN_WRAP.querySelector('.done .items__cards')

const TOTAL = MAIN_WRAP.querySelectorAll('.item__total--count')

const STORE = new Store()
const STORE_ARR_CARDS = STORE.get('cards')
if (STORE_ARR_CARDS) {
  console.log(STORE_ARR_CARDS)

  addCards(
    STORE_ARR_CARDS,
    ITEMS_CARDS_MAKETODO,
    ITEMS_CARDS_INPROGRESS,
    ITEMS_CARDS_DONE
  )
}

countTotal(TOTAL, STORE_ARR_CARDS)

// Date now
const Date = document.querySelector('.date')

Date.textContent = createDate()

// Opening and closing form
const BTN_POPUP_ADD = MAIN_WRAP.querySelector('.item__add')
const POPUP_FORM = document.querySelector('.popup')

BTN_POPUP_ADD.addEventListener('click', () => {
  POPUP_FORM.classList.remove('active')
  window.scrollTo(0, 0)
  document.body.style.overflow = 'hidden'

  POPUP_FORM.querySelector('.popup__form--title input').value = ''
  POPUP_FORM.querySelector('.popup__form--description textarea').value = ''
  POPUP_FORM.querySelector('.popup__form--author input').value = ''
})

const BTN_POPUP_CLOSE = POPUP_FORM.querySelector('.popup__close')

const BTN_POPUP_CANSEL = POPUP_FORM.querySelector('.popup__form--cansel')

BTN_POPUP_CLOSE.addEventListener('click', () => {
  POPUP_FORM.classList.add('active')
  document.body.style.overflow = ''
})
BTN_POPUP_CANSEL.addEventListener('click', (ev) => {
  ev.preventDefault()
  POPUP_FORM.classList.add('active')
  document.body.style.overflow = ''
})

const BTN_POPUP_CREATE = POPUP_FORM.querySelector('.popup__form--create')

// add card
BTN_POPUP_CREATE.addEventListener('click', (ev) => {
  ev.preventDefault()

  let title = POPUP_FORM.querySelector('.popup__form--title input').value
  let text = POPUP_FORM.querySelector(
    '.popup__form--description textarea'
  ).value
  let author = POPUP_FORM.querySelector('.popup__form--author input').value
  let date = createDate()
  let id

  let cardsArr = STORE.get('cards')

  if (cardsArr) {
    id = getIdCard(cardsArr)
  } else {
    id = 0
  }

  let card = new Card(title, text, author, date, id, 0)

  if (cardsArr) {
    cardsArr.push(card.get())
    STORE.set('cards', cardsArr)
  } else {
    let arr = []
    arr.push(card.get())
    STORE.set('cards', arr)
  }

  addCards(
    STORE.get('cards'),
    ITEMS_CARDS_MAKETODO,
    ITEMS_CARDS_INPROGRESS,
    ITEMS_CARDS_DONE
  )
  // remove item
  for (let btn of MAIN_WRAP.querySelectorAll('.card__delete')) {
    btn.addEventListener('click', () => {
      STORE.removeItem('cards', STORE.get('cards'), btn.getAttribute('data-id'))
      btn.closest('.card').remove()
      countTotal(TOTAL, STORE.get('cards'))
    })
  }
  // drag start
  itemCards = MAIN_WRAP.querySelectorAll('.card')
  itemCards.forEach(function (elem, index) {
    elem.addEventListener('dragstart', function (event) {
      event.dataTransfer.setData('item', index)
    })
  })
  // count total
  countTotal(TOTAL, STORE.get('cards'))

  POPUP_FORM.classList.add('active')
  document.body.style = ''
})

//Remove all cards
const BTN_DELETE_ALL = MAIN_WRAP.querySelectorAll('.item__del')

for (let i = 0; i < BTN_DELETE_ALL.length; i++) {
  BTN_DELETE_ALL[i].addEventListener('click', () => {
    if (STORE.get('cards')) {
      let arrCard = STORE.get('cards')

      STORE.removeItems('cards', arrCard, i)

      MAIN_WRAP.querySelectorAll(`.card[data-status="${i}"]`).forEach(
        (card) => {
          card.remove()
        }
      )
    }
    countTotal(TOTAL, STORE.get('cards'))
  })
}
//Remove one card
let BTN_REMOVE = MAIN_WRAP.querySelectorAll('.card__delete')
for (let btn of BTN_REMOVE) {
  btn.addEventListener('click', () => {
    let arrCard = STORE.get('cards')
    let id = btn.getAttribute('data-id')
    STORE.removeItem('cards', arrCard, id)
    countTotal(TOTAL, STORE.get('cards'))

    btn.closest('.card').remove()
  })
}

//Dragdrop

const ITEMS_CARDS = MAIN_WRAP.querySelectorAll('.items__cards')
let itemCards = MAIN_WRAP.querySelectorAll('.card')

itemCards.forEach(function (elem, index) {
  elem.addEventListener('dragstart', function (event) {
    event.dataTransfer.setData('item', index)
  })
  elem.addEventListener('dragend', function (event) {
    countTotal(TOTAL, STORE.get('cards'))
  })
})

for (let i = 0; i < ITEMS_CARDS.length; i++) {
  ITEMS_CARDS[i].addEventListener('dragover', function (event) {
    event.dataTransfer.dropEffect = 'move'
    event.preventDefault()
  })
  ITEMS_CARDS[i].addEventListener('drop', function (event) {
    let item = itemCards[event.dataTransfer.getData('item')]
    this.appendChild(item)

    let arrCard = STORE.get('cards')
    for (let objCard of arrCard) {
      if (objCard.id == item.dataset.id) {
        objCard.status = i
        item.dataset.status = i
      }
    }

    countTotal(TOTAL, arrCard)

    STORE.set('cards', arrCard)
  })
}
