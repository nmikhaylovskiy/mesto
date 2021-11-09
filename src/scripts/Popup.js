export default class Popup {
    constructor(popupSelector) {
        this._popupElement = document.querySelector(popupSelector)
        this._closeByOverlayClick = this._closeByOverlayClick.bind(this)
        this.close = this.close.bind(this)
        this._closeByEcs = this._closeByEcs.bind(this)
    }

    _closeByOverlayClick(evt) {
        if (evt.target.classList.contains('popup')) {
            this.close()
        }

    }

    _closeByEcs(evt) {
        if (evt.key === 'Escape')
            this.close()
    }

    open() {
        this._popupElement.classList.add('popup_opened')
        document.addEventListener('keydown', this._closeByEcs )
    }

    close() {
        this._popupElement.classList.remove('popup_opened')
        document.removeEventListener('keydown', this._closeByEcs)
    }

    setEventListeners() {
        this._popupElement.querySelector('.popup__close').addEventListener('click', this.close)
        this._popupElement.addEventListener('mousedown', this._closeByOverlayClick)
    }
}