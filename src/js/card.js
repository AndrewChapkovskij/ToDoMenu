export default class Card {
  #objCard = {}

  constructor(title, text, author, date, id, status) {
    this.#objCard['title'] = title
    this.#objCard['text'] = text
    this.#objCard['author'] = author
    this.#objCard['date'] = date
    this.#objCard['id'] = id
    this.#objCard['status'] = status
  }
  get() {
    return this.#objCard
  }

  createHTML() {
    return `
    <div class="card" data-status="${
      this.#objCard['status']
    }" draggable="true" data-id="${this.#objCard['id']}">
    <div class="card__header">
      <div class="card__name"><span>to</span><span>do</span></div>
      <div class="card__date">${this.#objCard['date']}</div>
    </div>
    <div class="card__main">
      <h4 class="card__title">${this.#objCard['title']}</h4>
      <div class="card__text"><p>${this.#objCard['text']}</p></div>
    </div>
    <div class="card__footer">
      <div class="card__author">${this.#objCard['author']}</div>
      <div class="card__delete" data-id="${this.#objCard['id']}">
        <i class="fa-solid fa-trash"></i>
      </div>
    </div>
  </div>
    `
  }
}
