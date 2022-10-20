export function setStore(name, cardsArr) {
  localStorage.setItem(name, JSON.stringify(cardsArr))
}
export function getStore(name) {
  return JSON.parse(localStorage.getItem(name)) ?? false
}
export function delItemStore(name, cardsArr, id) {
  for (let i = 0; i < cardsArr.length; i++) {
    if (cardsArr[i].id == id) {
      cardsArr.splice(i, 1)
    }
  }
  cardsArr[0] ? setStore(name, cardsArr) : clearStore(name)
}
export function delItemsStore(name, cardsArr, status) {
  let newArr = []
  for (let i = 0; i < cardsArr.length; i++) {
    if (cardsArr[i].status != status) {
      newArr.push(cardsArr[i])
    }
  }
  newArr[0] ? setStore(name, newArr) : clearStore(name)
}
function clearStore(name) {
  localStorage.removeItem(name)
}
