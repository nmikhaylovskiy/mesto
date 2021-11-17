import { Card } from '../components/Card.js'
import "./index.css"
import FormValidator from "../components/FormValidator.js";
import Section from '../components/Section.js';
import { initialCards, userInfoData } from '../utils/constants.js'
import UserInfo from '../components/UserInfo.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import Api from '../components/Api.js';


const profileEditButton = document.querySelector('.profile__edit-button');
const userPopup = document.querySelector('#user-popup');
const nameInput = document.querySelector('#name');
const jobInput = document.querySelector('#job');
const image = document.querySelector('#name-card');
const title = document.querySelector('#popup-link');
const cardContainer = document.querySelector('.elements');
const openPopupAddCardButton = document.querySelector('.profile__add-button');
const popupAddCard = document.querySelector('#edit-popup');


////////  --->>>>>
const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-30/',
  headers: {
      authorization: 'cd58889d-4007-40b0-abc9-c4f5ad470e2a',
      'Content-Type': 'application/json'
  }
});

Promise.all([api.getUserInfo()])
  .then(([userData, userCard]) => {
    console.log(">>>>>>>> userData", userData)
    handleProfileFormSubmit(userData);
      // handleUserCards(userCard)
  })
  .catch((err) => {
      console.log(`Вот, что произошло. ${err}`);
  });


//////////

const sectionCards = new Section({ items: initialCards.reverse(), renderer: createCard }, '.elements')
sectionCards.renderItems() // заполнение галереи с карточками

const userInfo = new UserInfo({ nameElement: '.profile__title', captionElement: '.profile__subtitle' })
userInfo.setUserInfo(userInfoData)

const myPopupWithImage = new PopupWithImage('#popup-image')
myPopupWithImage.setEventListeners()

const popupProfile = new PopupWithForm('#user-popup', handleProfileFormSubmit)
popupProfile.setEventListeners()

const popupCard = new PopupWithForm('#edit-popup', handleCardFormSubmit)
popupCard.setEventListeners()

//создание карточки
function createCard(params) {
  return new Card(params.name, params.link, '#element-template', handlePreviewPicture).generateCard();

}

// добавление записи
function handleCardFormSubmit(evt) {
  evt.preventDefault();
  cardContainer.prepend(createCard({ name: image.value, link: title.value }))

  title.value = '';
  image.value = '';
  popupCard.close()
}

//обработка клика
function handlePreviewPicture(event) {
  myPopupWithImage.open(event.target.parentNode.textContent, event.target.src)
}

function openCardPopup(evt) {
  popupCard.open()
}

function openPofilePopup() {
  popupProfile.open()

  const info = userInfo.getUserInfo()
  nameInput.value = info.name;
  jobInput.value = info.caption;
}

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  userInfo.setUserInfo(popupProfile._getInputValues())

  popupProfile.close()
}

profileEditButton.addEventListener('click', openPofilePopup);
openPopupAddCardButton.addEventListener('click', openCardPopup);

const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_invalid',
  inputErrorClass: 'popup__field_type_error',
  errorClass: 'error_visible'
};

const validFormSubmitCard = new FormValidator(validationConfig, popupAddCard);
validFormSubmitCard.enableValidation();
const validFormProfile = new FormValidator(validationConfig, userPopup);
validFormProfile.enableValidation();