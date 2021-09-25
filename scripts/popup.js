



let openPopupCard = document.querySelector('.profile__edit-button');
let popup = document.querySelector('.popup');
let closePopupCard = popup.querySelector('.popup__close');

let nameInput = document.querySelector('#name');
let jobInput = document.querySelector('#job');

let profileName = document.querySelector('.profile__title')
let profileJob = document.querySelector('.profile__subtitle')
let formElement = document.querySelector('.popup__form');

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
function formSubmitCard(evt) {
   evt.preventDefault();
   addCard(title.value, image.value);
   title.value = '';
   image.value = '';
   closePopup(popupAddCard);
}


// Добавление карточки
function addCard(imageValue, nameValue) {
   console.log(">>>>", imageValue, nameValue)
   cardContainer.prepend(createCard(imageValue, nameValue));
}

//обработка клика
function clickHandler(link, name) {
   openPopup(popupBigSizeImg);
   popupBigImg.src = link;
   popupNameBigImg.textContent = name;
}

//создание карточки
function createCard(imageValue, nameValue) {
   const cardTemplate = document.querySelector('#element-template').content;
   const cardElement = cardTemplate.querySelector('.element').cloneNode(true);
   const cardImage = cardElement.querySelector('.element__image');
   cardImage.src = imageValue;
   cardElement.querySelector('.element__like-icon').addEventListener('click', function (evt) {
      evt.target.classList.toggle('element__like-icon_active');
   });

   cardElement.querySelector('.element__delete').addEventListener('click', function (evt) {
      evt.target.closest('.element').remove();
   });

   cardElement.querySelector('.element__name').textContent = nameValue;
   cardImage.addEventListener('click', () => clickHandler(imageValue, nameValue));
   return cardElement;
}


//загрузка карточек из массива
initialCards.forEach((card) => {
   const newCard = createCard(card.link, card.name);
   cardContainer.prepend(newCard);
});





function openPopup(popup) {
   popup.classList.add('popup_opened');
}

function openPofilePopup() {
   openPopup(popup);
   nameInput.value = profileName.textContent;
   jobInput.value = profileJob.textContent;
}


function closePopup(popup) {
   popup.classList.remove('popup_opened');
}

function closePofilePopup() {
   closePopup(popup);
}


function formSubmitHandler(evt) {
   evt.preventDefault();
   profileName.textContent = nameInput.value;
   profileJob.textContent = jobInput.value;
   closePopup(popup)
}


formElement.addEventListener('submit', formSubmitHandler);
openPopupCard.addEventListener('click', openPofilePopup);
closePopupCard.addEventListener('click', closePofilePopup);

formElementAddCard.addEventListener('submit', formSubmitCard);
openPopupAddCardButton.addEventListener('click', () => openPopup(popupAddCard));
closePopupAddCardButton.addEventListener('click', () => closePopup(popupAddCard));

popupCloseBigImg.addEventListener('click', popupBigSizeImg);
popupCloseBigImg.addEventListener('click', () => closePopup(popupBigSizeImg));
