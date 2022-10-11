import Card from './card.js'

export function addCards(cardsArr, maketodo, inprogres, done) {
  maketodo.innerHTML = ''
  inprogres.innerHTML = ''
  done.innerHTML = ''

  for (let cardObj of cardsArr) {
    let card = new Card(...Object.values(cardObj))

    if (cardObj.status == 0) {
      maketodo.innerHTML += card.createHTML()
    }
    if (cardObj.status == 1) {
      inprogres.innerHTML += card.createHTML()
    }
    if (cardObj.status == 2) {
      done.innerHTML += card.createHTML()
    }
  }
}

export function getIdCard(cardsArr) {
  index = 0
  for (let cardObj of cardsArr) {
    cardObj['id'] = index++
  }
  return index
}

// count total
export function countTotal(items, arrCard) {
  for (let i = 0; i < items.length; i++) {
    let count = 0
    if (arrCard) {
      for (let objCard of arrCard) {
        if (objCard.status == i) {
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
