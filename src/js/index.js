const BTN_POPUP_ADD = document.querySelector('.item__add')
const POPUP_FORM = document.querySelector('.popup')

BTN_POPUP_ADD.addEventListener('click', () => {
  POPUP_FORM.classList.remove('active')
})

BTN_POPUP_CLOSE = document.querySelector('.popup__close')

BTN_POPUP_CLOSE.addEventListener('click', () => {
  POPUP_FORM.classList.add('active')
})
