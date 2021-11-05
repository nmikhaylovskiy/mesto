import { Card } from './Card.js';
import "../pages/index.css"

import FormValidator from "./FormValidator.js";
import Section from './Section.js';

import { initialCards, userInfoData } from './constants.js'

import UserInfo from './UserInfo.js';
import PopupWithImage from './PopupWithImage.js';
import PopupWithForm from './PopupWithForm.js';



const profileEditButton = document.querySelector('.profile__edit-button');
const userPopup = document.querySelector('#user-popup');
const closeUserPopupCard = userPopup.querySelector('.popup__close');

const nameInput = document.querySelector('#name');
const jobInput = document.querySelector('#job');

const profileName = document.querySelector('.profile__title')
const profileJob = document.querySelector('.profile__subtitle')
const userFormElement = document.querySelector('#user-form');

const formElementAddCard = document.querySelector('#popup-form')
const image = document.querySelector('#name-card');
const title = document.querySelector('#popup-link');

const cardContainer = document.querySelector('.elements');
const openPopupAddCardButton = document.querySelector('.profile__add-button');
const popupAddCard = document.querySelector('#edit-popup');
const closePopupAddCardButton = document.querySelector('#popup-add-close');


const sectionCards = new Section({ items: initialCards.reverse(), renderer: createCard }, '.elements')


const userInfo = new UserInfo({ nameElement: '.profile__title', captionElement: '.profile__subtitle' })
userInfo.setUserInfo(userInfoData)


const myPopupWithImage = new PopupWithImage('#popup-image', closeByEscape)
myPopupWithImage.setEventListeners()

const popupProfile = new PopupWithForm('#user-popup', closeByEscape, handleProfileFormSubmit)
popupProfile.setEventListeners()

const popupCard = new PopupWithForm('#edit-popup', closeByEscape, handleCardFormSubmit)
popupCard.setEventListeners()





//создание карточки
function createCard(params) {
  console.log("create", params, params)
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

sectionCards.renderItems() // заполнение галереи с карточками




//обработка клика
function handlePreviewPicture(event) {
  myPopupWithImage.open(event.target.parentNode.textContent, event.target.src)
}


function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closeByEscape)
}

function openPofilePopup() {
  popupProfile.open()

  const info = userInfo.getUserInfo()
  nameInput.value = info.name;
  jobInput.value = info.caption;
}


function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closeByEscape)
}

function closeByEscape(e) {
  if (e.key === 'Escape') {
    const activePopup = document.querySelector('.popup_opened')
    closePopup(activePopup)
  }
}



function handleProfileFormSubmit(evt) {
  evt.preventDefault();

  userInfo.setUserInfo(popupProfile._getInputValues())

  popupProfile.close()
}


profileEditButton.addEventListener('click', openPofilePopup);

openPopupAddCardButton.addEventListener('click', () => openPopup(popupAddCard));

closePopupAddCardButton.addEventListener('click', () => closePopup(popupAddCard));


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