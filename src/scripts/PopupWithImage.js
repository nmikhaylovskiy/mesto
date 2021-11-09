import Popup from './Popup.js'

export default class PopupWithImage extends Popup {
    constructor(selector) {
        super(selector)
        this._img = this._popupElement.querySelector('.popup__big-img')
        this._title = this._popupElement.querySelector('.popup__name-big-img')
    }

    open(name, link) {
        super.open()
        this._img.src = link
        this._img.alt = name
        this._title.textContent = name
    }
}