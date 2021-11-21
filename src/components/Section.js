export default class Section {
  constructor(containerSelector) {
    this._container = document.querySelector(containerSelector)
  }

  addItem(item) {
    this._container.prepend(item)
  }

  // renderItems(items) {
  //   console.error(items);
  //   items.forEach(item => this.addItem(item))
  // }
}