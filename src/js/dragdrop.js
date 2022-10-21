import { getStore, setStore } from './store.js'
import { getElemAll } from './getter'
import { countTotal } from './actions'

let cards

export function startDrag() {
  cards = getElemAll('.card')
  cards.forEach(function (elem, index) {
    elem.addEventListener('dragstart', function (event) {
      event.dataTransfer.setData('item', index)
    })
  })
}

export function dropDrag(cards_wrap, total) {
  for (let i = 0; i < cards_wrap.length; i++) {
    // If the card is located in the zone parentBlock
    cards_wrap[i].addEventListener('dragover', function (event) {
      event.dataTransfer.dropEffect = 'move'
      event.preventDefault()
    })
    // Drop card
    cards_wrap[i].addEventListener('drop', function (event) {
      let card = cards[event.dataTransfer.getData('item')]
      this.appendChild(card)
      // Change status of card
      let cardsArr = getStore('cards')
      for (let cardObj of cardsArr) {
        if (cardObj.id == card.dataset.id) {
          cardObj.status = i
          card.dataset.status = i
        }
      }
      // Update store
      setStore('cards', cardsArr)
      // Count total
      countTotal(total, cardsArr)
    })
  }
}
