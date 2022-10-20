export function createObj(title, text, author, date, id, status) {
  this.title = title
  this.text = text
  this.author = author
  this.date = date
  this.id = id
  this.status = status
}
export function render({ title, text, author, date, id, status }) {
  return `
    <div class="card" data-status="${status}" draggable="true" data-id="${id}">
    <div class="card__header">
      <div class="card__name"><span>to</span><span>do</span></div>
      <div class="card__date">${date}</div>
    </div>
    <div class="card__main">
      <h4 class="card__title">${title}</h4>
      <div class="card__text"><p>${text}</p></div>
    </div>
    <div class="card__footer">
      <div class="card__author">${author}</div>
      <div class="card__delete" data-id="${id}">
        <i class="fa-solid fa-trash"></i>
      </div>
    </div>
  </div>
    `
}
