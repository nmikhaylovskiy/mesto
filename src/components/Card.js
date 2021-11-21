export class Card {
  constructor(name, link, likes, id, ownerId, userId, cardSelector, elementClickHandler, handleDelete, handleLike) {
    this._name = name;
    this._link = link;
    this._id = id;
    this._ownerId = ownerId;
    this._userId = userId;
    this._likes = likes;
    this._cardSelector = cardSelector;
    this._elementClickHandler = elementClickHandler;
    this._handleDelete = handleDelete;
    this._handleLike = handleLike;
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
    this._element.querySelector('.element__like-count').textContent = this._likes?.length || 0
    if (this._ownerId !== this._userId) {
      this._element.querySelector('.element__delete').classList.add('element__delete_hidden');
    }
    if (this._likes && this._likes.some(like => like._id == this._userId))
      this._element.querySelector('.element__like-icon').classList.add('element__like-icon_active');

    this._setEventListeners();
    return this._element;
  }

  _deleteCard() {
    this._handleDelete(this._element, this._id)
  }

  _likeCard() {
    const buttonLike = this._element.querySelector('.element__like-icon');
    const isLiked = buttonLike.classList.contains('element__like-icon_active')

    this._handleLike(isLiked, this._id).then(data => {
      buttonLike.classList.toggle('element__like-icon_active');
      this._element.querySelector('.element__like-count').textContent = data.likes.length

    }).catch(err => console.error(err))

  }
  _setEventListeners() {
    this._element.querySelector('.element__like-icon').addEventListener('click', () => {
      this._likeCard()
    });
    this._element.querySelector('.element__delete').addEventListener('click', () => {
      this._deleteCard()
    });
    this._elementImage.addEventListener('click', () => {
      this._elementClickHandler(this._name, this._link)
    });
  }
}