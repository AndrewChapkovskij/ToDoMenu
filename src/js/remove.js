import { getStore, delItemStore, delItemsStore } from './store.js'
import { getElemAll } from './getter'
import { countTotal } from './actions'

export function setBtnRemove(total) {
  for (let btn of getElemAll('.card__delete')) {
    btn.addEventListener('click', () => {
      delItemStore('cards', getStore('cards'), btn.getAttribute('data-id'))

      btn.closest('.card').remove()
      countTotal(total, getStore('cards'))
    })
  }
}

export function setBtnRemoveAll(total) {
  const BTN_DELETE_ALL = getElemAll('.item__del')

  for (let i = 0; i < BTN_DELETE_ALL.length; i++) {
    BTN_DELETE_ALL[i].addEventListener('click', () => {
      let cardArr = getStore('cards')

      if (cardArr) {
        delItemsStore('cards', cardArr, i)

        getElemAll(`.card[data-status="${i}"]`).forEach((card) => {
          card.remove()
        })

        countTotal(total, getStore('cards'))
      }
    })
  }
}
