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

// --Check localStorage--
const CARDS_WRAP = getElemAll('.items__cards')
const ARR_CARDS = getStore('cards')

if (ARR_CARDS) {
  addCards(ARR_CARDS, CARDS_WRAP)
  // Count quantity
  countTotal(ARR_CARDS)
  // Remove one card
  setBtnRemove()
  // Move cards, check status of arrows
  checkArrows()
}
//Remove all cards
setBtnRemoveAll()
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
    cardsArr = []
    cardsArr.push(cardObj)
    setStore('cards', cardsArr)
  }

  // Add cards to DOM
  addCard(cardObj, CARDS_WRAP)
  //Add event cardRemove
  setBtnRemove()
  // Drag start
  getElemAll('.card').forEach(function (card) {
    card.ondragstart = dragStart
  })
  // count total
  countTotal(cardsArr)
  // Close form
  toggleForm('')
  // Move cards, check status of arrows
  checkArrows()
})
// --/Create card--

// --Dragdrop--
let currentCard
// Event dragstart
getElemAll('.card').forEach(function (card) {
  card.ondragstart = dragStart
})
function dragStart() {
  currentCard = this
}
// Event drop card
for (let i = 0; i < CARDS_WRAP.length; i++) {
  // Change cursor
  CARDS_WRAP[i].addEventListener('dragover', function (event) {
    event.dataTransfer.dropEffect = 'move'
    event.preventDefault()
  })
  // Drop card
  CARDS_WRAP[i].addEventListener('drop', function () {
    this.appendChild(currentCard)
    //  Change status of card
    let cardsArr = getStore('cards')
    for (let cardObj of cardsArr) {
      if (cardObj.id == currentCard.dataset.id) {
        cardObj.status = i
        currentCard.dataset.status = i
      }
    }
    // Update store
    setStore('cards', cardsArr)
    // Count total
    countTotal(cardsArr)
    // Update move cards
    checkArrows()
  })
  // --/Dragdrop--

  // --Event move card with click--
  CARDS_WRAP[i].addEventListener('click', (ev) => {
    let cards = getElemAll('.card')
    let cardsArr = getStore('cards')
    cards.forEach((card) => {
      // If click left arrow
      if (ev.target === getElem('.fa-arrow-left', card)) {
        card.dataset.status--

        cardsArr.forEach((cardObj) => {
          if (card.dataset.id == cardObj.id) {
            cardObj.status--
            card.remove()
            CARDS_WRAP[i - 1].append(card)
            countTotal(cardsArr)
            checkArrows()
          }
        })

        setStore('cards', cardsArr)
      }
      // If click right arrow
      if (ev.target === getElem('.fa-arrow-right', card)) {
        card.dataset.status++
        cardsArr.forEach((cardObj) => {
          if (card.dataset.id == cardObj.id) {
            cardObj.status++
            card.remove()
            CARDS_WRAP[i + 1].append(card)
            countTotal(cardsArr)
            checkArrows()
          }
        })
        setStore('cards', cardsArr)
      }
    })
  })
  // --/Event move card--
}

// Check status of arrows
function checkArrows() {
  getElemAll('.card__move').forEach((arrows) => {
    let btnRight = getElem('.card__move--right', arrows)
    let btnLeft = getElem('.card__move--left', arrows)

    let status = arrows.closest('.card').dataset.status

    if (status == 2) {
      btnRight.classList.add('active')
      btnLeft.classList.remove('active')
    } else if (status == 0) {
      btnLeft.classList.add('active')
      btnRight.classList.remove('active')
    } else {
      btnLeft.classList.remove('active')
      btnRight.classList.remove('active')
    }
  })
}
