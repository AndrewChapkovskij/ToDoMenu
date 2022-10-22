const MAIN_WRAP = document.querySelector('#main .item_wrap')

export function getElem(src, place = MAIN_WRAP) {
  return place.querySelector(src)
}
export function getElemAll(src, place = MAIN_WRAP) {
  return place.querySelectorAll(src)
}
