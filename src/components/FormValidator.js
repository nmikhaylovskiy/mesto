export default class FormValidator {
  constructor(validationConfig, formElement) {
    this.config = validationConfig;
    this._formElement = formElement;
    this._buttonElement = this._formElement.querySelector(this.config.submitButtonSelector);
    this._inputList = Array.from(
      this._formElement.querySelectorAll(this.config.inputSelector)
    );
    this._setEventListeners = this._setEventListeners.bind(this)
    this._toggleButtonState = this._toggleButtonState.bind(this)
    this._hasInvalidInput = this._hasInvalidInput.bind(this)
    this._checkInputValidity = this._checkInputValidity.bind(this)
  }

  _showInputError(inputElement, errorMessage) {
    inputElement.classList.add(this.config.inputErrorClass);
    errorMessage.textContent = inputElement.validationMessage;
    errorMessage.classList.add(this.config.errorClass);
  }

  _hideInputError(errorElement) {
    errorElement.textContent = " ";
  }

  _checkInputValidity(inputElement) {
    const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);
    if (!inputElement.validity.valid) {
      this._showInputError(
        inputElement,
        errorElement,
      );
    } else {
      this._hideInputError(errorElement);
    }
  }

  _hasInvalidInput() {
    return this._inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }


  _disableSubmitButton = (inactiveButtonClass) => {
    this._buttonElement.classList.add(inactiveButtonClass);
    this._buttonElement.disabled = true;
  };

  _enableSubmitButton = (inactiveButtonClass) => {
    this._buttonElement.classList.remove(inactiveButtonClass);
    this._buttonElement.disabled = false;
  };


  _toggleButtonState() {
    if (this._hasInvalidInput()) {
      this._disableSubmitButton(this.config.inactiveButtonClass);
    } else {
      this._enableSubmitButton(this.config.inactiveButtonClass);
    }
  }

  _setEventListeners() {
    this._formElement.addEventListener("submit", (event) => {
      event.preventDefault();
      // event.target.querySelector(this.config.submitButtonSelector).classList.toggle(this.config.inactiveButtonClass)

    })
    this._toggleButtonState();
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState();
      });
    });
  }

  resetValidation() {
    this._disableSubmitButton(this.config.inactiveButtonClass);
    this._inputList.forEach((inputElement) => {
      this._hideInputError(inputElement)
    });
  }

  enableValidation() {
    this._setEventListeners();
  }
}