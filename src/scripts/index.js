import { Card } from './Card.js';
import "../pages/index.css"

import FormValidator from "./FormValidator.js";
import Section from './Section.js';

import {initialCards, userInfoData } from './constants.js'


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



const popupBigSizeImg = document.querySelector('#popup-image');
const popupOpenBigImg = document.querySelector('.element__image');
const popupCloseBigImg = document.querySelector('#popup-img-close');
const popupBigImg = document.querySelector('.popup__big-img');
const popupNameBigImg = document.querySelector('.popup__name-big-img');

const sectionCards = new Section({items: initialCards.reverse(), renderer: createCard}, '.elements')

//создание карточки
function createCard(params) {
  console.log("create", params, params)
  return new Card(params.name, params.link, '#element-template', handlePreviewPicture).generateCard();

}



// добавление записи
function handleCardFormSubmit(evt) {
  evt.preventDefault();
  cardContainer.prepend(createCard({name: image.value, link: title.value}))

  title.value = '';
  image.value = '';
  closePopup(popupAddCard);
}

sectionCards.renderItems() // заполнение галереи с карточками




//обработка клика
function handlePreviewPicture(event) {
  openPopup(popupBigSizeImg);
  popupBigImg.src = event.target.src;
  popupNameBigImg.textContent = event.target.parentNode.textContent;
  popupBigImg.alt = event.target.parentNode.textContent;
}


function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closeByEscape)
}

function openPofilePopup() {
  openPopup(userPopup);
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
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

function closeOnOverlay(e) {
  if (e.target.classList.contains('popup_opened')) {
    closePopup(e.target)
  }
}


function closePofilePopup() {
  closePopup(userPopup);
}


function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  closePopup(userPopup)
}

document.addEventListener('click', closeOnOverlay)

userFormElement.addEventListener('submit', handleProfileFormSubmit);
profileEditButton.addEventListener('click', openPofilePopup);
closeUserPopupCard.addEventListener('click', closePofilePopup);

formElementAddCard.addEventListener('submit', handleCardFormSubmit);
openPopupAddCardButton.addEventListener('click', () => openPopup(popupAddCard));

closePopupAddCardButton.addEventListener('click', () => closePopup(popupAddCard));
popupCloseBigImg.addEventListener('click', () => closePopup(popupBigSizeImg));


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