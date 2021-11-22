export default class Section {
  constructor(containerSelector, renderer) {
    this._container = document.querySelector(containerSelector)
    this._renderer = renderer
  }

  addItem(item) {
    this._container.prepend(this._renderer(item))
  }

  renderItems(items) {
    items.forEach(item => this.addItem(item))
  }
}