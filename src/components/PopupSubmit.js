import Popup from './Popup.js'

export default class PopupSubmit extends Popup {
    constructor(selector, callbackSubmit) {
        super(selector)
        this._handleFormSubmit = callbackSubmit
        this._formElement = this._popupElement.querySelector('.popup__form')
        this._cardForDeleteId = '';
        this._elementForDelete;
    }


    open(element, cardId) {
        super.open()
        this._cardForDeleteId = cardId
        this._elementForDelete = element
    }

    setEventListeners() {
        super.setEventListeners()
        this._formElement.addEventListener('submit', (event) => {
            event.preventDefault()
            return this._handleFormSubmit(this._elementForDelete, this._cardForDeleteId).then(() => {
                this.close();
            }).catch(err => err)
        })
    }
}