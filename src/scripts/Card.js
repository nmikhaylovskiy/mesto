export class Card {
  constructor(name, link, cardSelector, elementClickHandler) {
    this._name = name;
    this._link = link;
    this._cardSelector = cardSelector;
    this._elementClickHandler = elementClickHandler;
    this._element = this._getTemplate();
    this._elementImage = this._element.querySelector('.element__image')
  }
  _getTemplate() {

    return document.querySelector(this._cardSelector).content.querySelector('.element').cloneNode(true);
  }
  generateCard() {
    this._elementImage.alt = this._name;
    this._elementImage.src = this._link;
    this._element.querySelector('.element__name').textContent = this._name;
    this._setEventListeners();
    return this._element;
  }
  _deleteCard() {
    this._element.remove();
    this._element = null;
  }
  _likeCard() {
    const buttonLike = this._element.querySelector('.element__like-icon');
    console.log(buttonLike)
    buttonLike.classList.toggle('element__like-icon_active');

  }
  _setEventListeners() {
    this._element.querySelector('.element__like-icon').addEventListener('click', () => {
      this._likeCard()
    });
    this._element.querySelector('.element__delete').addEventListener('click', () => {
      this._deleteCard()
    });
    this._elementImage.addEventListener('click', this._elementClickHandler);
  }
}