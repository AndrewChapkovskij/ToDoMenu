import { render } from './render'

// Add all cards
export function addCards(cardsArr, wrap) {
  for (let i = 0; i < wrap.length; i++) {
    for (let item of cardsArr) {
      if (item.status == i) {
        wrap[i].innerHTML += render(item)
      }
    }
  }
}

// Add one card
export function addCard(cardObj, wrap) {
  for (let i = 0; i < wrap.length; i++) {
    if (cardObj.status == i) {
      wrap[i].innerHTML += render(cardObj)
    }
  }
}

// Get id
export function getIdCard(cardsArr) {
  id = 0
  for (let cardObj of cardsArr) {
    if (cardObj['id'] >= id) {
      id = cardObj['id']
      id++
    }
  }
  return id
}

// Count total
export function countTotal(items, cardArr) {
  for (let i = 0; i < items.length; i++) {
    let count = 0
    if (cardArr) {
      for (let cardObj of cardArr) {
        if (cardObj.status == i) {
          count++
        }
      }
      items[i].textContent = count
    } else {
      items[i].textContent = count
    }
  }
}

// Create Date
export function createDate() {
  let date = new Date()
  let day = date.getDate()
  let month = date.getMonth() + 1
  if (day < 10) {
    day = '0' + day
  }
  if (month < 10) {
    month = '0' + month
  }

  return `${day}.${month}.${date.getFullYear()}`
}
