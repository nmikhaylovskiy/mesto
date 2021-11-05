export default class Section {
  constructor({ items, renderer }, containerSelector) {
    this._items = items
    this._renderer = renderer
    this._container = document.querySelector(containerSelector)
  }

  addItem(item) {
    console.log(this._container, item)
    this._container.prepend(this._renderer(item))
  }

  renderItems() {
    console.log(this._items)
    this._items.forEach(item => this.addItem(item))
  }
}