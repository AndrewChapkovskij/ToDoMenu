import { getStore, delItemStore, delItemsStore } from './store.js'
import { getElemAll } from './getter'
import { countTotal } from './actions'

export function setBtnRemove() {
  for (let btn of getElemAll('.card__delete')) {
    btn.onclick = removeCard
  }
}

export function setBtnRemoveAll() {
  const BTN_DELETE_ALL = getElemAll('.item__del')

  for (let i = 0; i < BTN_DELETE_ALL.length; i++) {
    BTN_DELETE_ALL[i].addEventListener('click', () => {
      let cardArr = getStore('cards')

      if (cardArr) {
        delItemsStore('cards', cardArr, i)

        getElemAll(`.card[data-status="${i}"]`).forEach((card) => {
          card.remove()
        })

        countTotal(getStore('cards'))
      }
    })
  }
}

function removeCard() {
  delItemStore('cards', getStore('cards'), this.dataset.id)
  this.closest('.card').remove()
  countTotal(getStore('cards'))
}
