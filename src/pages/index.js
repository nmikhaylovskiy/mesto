import { Card } from '../components/Card.js'
import "./index.css"
import FormValidator from "../components/FormValidator.js";
import Section from '../components/Section.js';
import { initialCards, userInfoData } from '../utils/constants.js'
import UserInfo from '../components/UserInfo.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import Api from '../components/Api.js';
import PopupSubmit from '../components/PopupSubmit.js';


const profileEditButton = document.querySelector('.profile__edit-button');
const userPopup = document.querySelector('#user-popup');
const nameInput = document.querySelector('#name');
const jobInput = document.querySelector('#job');
const image = document.querySelector('#name-card');
const title = document.querySelector('#popup-link');
const cardContainer = document.querySelector('.elements');
const openPopupAddCardButton = document.querySelector('.profile__add-button');
const popupAddCard = document.querySelector('#edit-popup');
const avatarPopup = document.querySelector('#avatar-popup');
const buttonEditAvatar = document.querySelector('.profile__edit-avatar');
const newAvatarVal = document.querySelector('#avatar-input');


////////  --->>>>>
const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-30/',
  headers: {
    authorization: 'cd58889d-4007-40b0-abc9-c4f5ad470e2a',
    'Content-Type': 'application/json'
  }
});

Promise.all([api.getUserInfo(), api.getInitialCards()])
  .then(([userData, userCard]) => {
    userInfo.setUserInfo({ "name": userData.name, "job": userData.about, "id": userData._id })
    userInfo.setUserAvatar(userData.avatar)
    for (let i = userCard.length - 1; i > 0; i--) {
      cardContainer.prepend(createCard({ name: userCard[i].name, link: userCard[i].link, likes: userCard[i].likes, id: userCard[i]._id, ownerId: userCard[i].owner._id, userId: userData._id }))

    }
  })
  .catch((err) => {
    console.error(`Ошибка. ${err}`);
  });


//////////



const userInfo = new UserInfo({ nameElement: '.profile__title', captionElement: '.profile__subtitle', userAvatar: ".profile__avatar" })
userInfo.setUserInfo(userInfoData)

const myPopupWithImage = new PopupWithImage('#popup-image')
myPopupWithImage.setEventListeners()

const popupProfile = new PopupWithForm('#user-popup', event => {
  event.preventDefault();
  popupProfile.showSavingText(true)
  handleProfileFormSubmit(event).finally(() => {
    popupProfile.close()
    popupProfile.showSavingText(false)

  })
})
popupProfile.setEventListeners()

const popupCard = new PopupWithForm('#edit-popup', event => {
  event.preventDefault();
  popupCard.showSavingText(true)
  handleCardFormSubmit(event).finally(() => {
    popupCard.showSavingText(false)

  })
})
popupCard.setEventListeners()


const popupSubmit = new PopupSubmit('#submit-delete-popup', handleDelete)
popupSubmit.setEventListeners()


const avatarEdit = new PopupWithForm('#avatar-popup', handleAvatarChange)
avatarEdit.setEventListeners()

//создание карточки
function createCard(params) {
  return new Card(params.name, params.link, params.likes, params.id, params.ownerId, params.userId, '#element-template', handlePreviewPicture, handleSubmit, handleLike).generateCard();

}

function handleAvatarChange(evt) {
  evt.preventDefault();

  api.loadUserAvatar(newAvatarVal.value).then(newData => {
    console.log(newData)
    userInfo.setUserAvatar(newData.avatar)
  }
  )
  avatarEdit.close()

}

function handleSubmit(element, cardId) {
  popupSubmit.open(element, cardId)
}
function handleDelete(element, evt) {
  console.error(element, evt);
  api.deleteCard(evt).then(data => {
    element.remove()
  })
  popupSubmit.close()
}

function handleLike(isLiked, evt) {
  return isLiked ? api.removeLike(evt) : api.setLike(evt)
}

// добавление записи
function handleCardFormSubmit(evt) {
  evt.preventDefault();

  return api.uploadNewCard({ name: image.value, link: title.value }).then(userCard => {
    cardContainer.prepend(createCard({ name: userCard.name, link: userCard.link, id: userCard._id }))

  }).then(() => {

    title.value = '';
    image.value = '';
    popupCard.close()
  })

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

  return api.setUserInfo(popupProfile._getInputValues())

}

profileEditButton.addEventListener('click', openPofilePopup);
openPopupAddCardButton.addEventListener('click', openCardPopup);
buttonEditAvatar.addEventListener("click", () => avatarEdit.open())

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
const validationAvatar = new FormValidator(validationConfig, avatarPopup);
validationAvatar.enableValidation();