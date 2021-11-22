import { Card } from '../components/Card.js'
import "./index.css"
import FormValidator from "../components/FormValidator.js";
import Section from '../components/Section.js';
import { initialCards, userInfoData, validationConfig } from '../utils/constants.js'
import UserInfo from '../components/UserInfo.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import Api from '../components/Api.js';
import PopupSubmit from '../components/PopupSubmit.js';


const profileEditButton = document.querySelector('.profile__edit-button');
const userPopup = document.querySelector('#user-popup');
const nameInput = document.querySelector('#user-name');
const jobInput = document.querySelector('#job');
const cardContainer = document.querySelector('.elements');
const openPopupAddCardButton = document.querySelector('.profile__add-button');
const popupAddCard = document.querySelector('#edit-popup');
const avatarPopup = document.querySelector('#avatar-popup');
const buttonEditAvatar = document.querySelector('.profile__edit-avatar');

const section = new Section('.elements')

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
    userInfo.setUserInfo(userData.name, userData.about)
    userInfo.setUserAvatar(userData.avatar)
    const cardsToRender = []
    for (let i = 0; i < userCard.length; i++) {
      cardsToRender.push(createCard({ name: userCard[i].name, link: userCard[i].link, likes: userCard[i].likes, id: userCard[i]._id, ownerId: userCard[i].owner._id, userId: userData._id }))
    }
    section.renderItems(cardsToRender)


  })
  .catch((err) => {
    console.error(`Ошибка. ${err}`);
  });


//////////



const userInfo = new UserInfo({ nameElement: '.profile__title', captionElement: '.profile__subtitle', userAvatar: ".profile__avatar" })

const myPopupWithImage = new PopupWithImage('#popup-image')
myPopupWithImage.setEventListeners()

const popupProfile = new PopupWithForm('#user-popup', handleProfileFormSubmit)
popupProfile.setEventListeners()

const popupCard = new PopupWithForm('#edit-popup', handleCardFormSubmit)
popupCard.setEventListeners()


const popupSubmit = new PopupSubmit('#submit-delete-popup', handleDelete)
popupSubmit.setEventListeners()


const avatarEdit = new PopupWithForm('#avatar-popup', handleAvatarChange)
avatarEdit.setEventListeners()

//создание карточки
function createCard(params) {
  return new Card(params.name, params.link, params.likes, params.id, params.ownerId, params.userId, '#element-template', handlePreviewPicture, handleSubmit, handleLike).generateCard();

}

function handleAvatarChange(evt, items) {
  evt.preventDefault();
  return api.loadUserAvatar(Object.values(items)[0]).then(newData => {
    userInfo.setUserAvatar(newData.avatar)
  }
  )

}

function handleSubmit(element, cardId) {
  popupSubmit.open(element, cardId)
}
function handleDelete(element, evt) {
  return api.deleteCard(evt).then(data => {
    element.remove()
  })
}

function handleLike(isLiked, evt) {
  return isLiked ? api.removeLike(evt) : api.setLike(evt)
}

// добавление записи
function handleCardFormSubmit(evt, items) {
  evt.preventDefault();
  return api.uploadNewCard(items).then(userCard => {
    cardContainer.prepend(createCard({ name: userCard.name, link: userCard.link, id: userCard._id }))

  })

}

//обработка клика
function handlePreviewPicture(name, link) {
  myPopupWithImage.open(name, link)
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

function handleProfileFormSubmit(evt, items) {
  evt.preventDefault();

  return api.setUserInfo(items).then(() => {
    console.error(items);
    userInfo.setUserInfo(items['user-name'], items['job'])
  })

}

profileEditButton.addEventListener('click', openPofilePopup);
openPopupAddCardButton.addEventListener('click', openCardPopup);
buttonEditAvatar.addEventListener("click", () => avatarEdit.open())



const validFormSubmitCard = new FormValidator(validationConfig, popupAddCard);
validFormSubmitCard.enableValidation();
const validFormProfile = new FormValidator(validationConfig, userPopup);
validFormProfile.enableValidation();
const validationAvatar = new FormValidator(validationConfig, avatarPopup);
validationAvatar.enableValidation();