import { Card } from './Card.js';


import FormValidator from "./FormValidator.js";


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


// список карточек
const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];


// добавление записи
function handleCardFormSubmit(evt) {
  evt.preventDefault();
  console.log(title.value, image.value)
  renderCard(image.value,title.value);
  title.value = '';
  image.value = '';
  closePopup(popupAddCard);
}

//обработка клика
function handlePreviewPicture(event) {
  openPopup(popupBigSizeImg);
  popupBigImg.src = event.target.src;
  popupNameBigImg.textContent = event.target.parentNode.textContent;
  popupBigImg.alt = event.target.parentNode.textContent;
}

//создание карточки
function createCard(name, link) {
  return new Card(name, link, '#element-template', handlePreviewPicture);

}

function renderCard(name, link) {
  console.log("render", name, link, cardContainer)
  const card = createCard(name, link)
  cardContainer.prepend(card.generateCard());
}


function renderInitialCards() {
  initialCards.forEach((card) => renderCard(card.name, card.link))
}

renderInitialCards();






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

const validformSubmitCard = new FormValidator(validationConfig, popupAddCard);
validformSubmitCard.enableValidation();
const validFormProfile = new FormValidator(validationConfig, userPopup);
validFormProfile.enableValidation();