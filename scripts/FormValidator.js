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


  _disableSubmitButton = (buttonElement, inactiveButtonClass) => {
    buttonElement.classList.add(inactiveButtonClass);
    buttonElement.disabled = true;
  };

  _enableSubmitButton = (buttonElement, inactiveButtonClass) => {
    buttonElement.classList.remove(inactiveButtonClass);
    buttonElement.disabled = false;
  };


  _toggleButtonState() {
    const buttonElement = this._formElement.querySelector(this.config.submitButtonSelector);

    if (this._hasInvalidInput(this._inputList)) {
      this._disableSubmitButton(buttonElement, this.config.inactiveButtonClass);
    } else {
      this._enableSubmitButton(buttonElement, this.config.inactiveButtonClass);
    }
  }

  _setEventListeners() {
    this._formElement.addEventListener("submit", (event) => {
      event.preventDefault();
      event.target.querySelector(this.config.submitButtonSelector).classList.toggle(this.config.inactiveButtonClass)
    })

    const inputList = Array.from(this._formElement.querySelectorAll(this.config.inputSelector));
    this._toggleButtonState();
    inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._checkInputValidity(
          inputElement,
        );
        this._toggleButtonState(
        );
      });
    });
  }

  enableValidation() {
      this._setEventListeners();
  }
}