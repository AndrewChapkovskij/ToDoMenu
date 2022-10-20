const MAIN_WRAP = document.querySelector('#main .wrap')

export function getElem(src) {
  return MAIN_WRAP.querySelector(src)
}
export function getElemAll(src) {
  return MAIN_WRAP.querySelectorAll(src)
}
