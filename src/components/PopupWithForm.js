import Popup from './Popup.js'

export default class PopupWithForm extends Popup {
    constructor(selector, callbackSubmit) {
        super(selector)
        this._handleFormSubmit = callbackSubmit
        this._formElement = this._popupElement.querySelector('.popup__form')
        this._inputList = Array.from(this._popupElement.querySelectorAll('.popup__input'))
    }

    _getInputValues() {
        const formProps = {}
        this._inputList.map((input) => {
            formProps[input.id] = input.value
        })
        return formProps
    }

    close() {
        super.close()
        this._formElement.reset()
    }

    setEventListeners() {
        super.setEventListeners()
        this._formElement.addEventListener('submit', (evt) => this._handleFormSubmit(evt, this._getInputValues()))
    }
}