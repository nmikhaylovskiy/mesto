let openPopupCard = document.querySelector('.profile__edit-button');
let popup = document.querySelector('.popup');
let closePopupCard = popup.querySelector('.popup__close');

let nameInput = document.querySelector('#name');
let jobInput = document.querySelector('#job');

let profileName = document.querySelector('.profile__title')
let profileJob = document.querySelector('.profile__subtitle')
let formElement = document.querySelector('.popup__form');


function openPopup() {
   popup.classList.add('popup_opened');
}
function openPofilePopup() {
   openPopup();
   nameInput.value = profileName.textContent;
   jobInput.value = profileJob.textContent;
}


function closePopup() {
   popup.classList.remove('popup_opened');
}

function closePofilePopup() {
   closePopup();
}



function formSubmitHandler(evt) {
   evt.preventDefault();

   nameVal = nameInput.value;
   jobVal = jobInput.value;

   profileName.textContent = nameVal;
   profileJob.textContent = jobVal;
   closePopup()
}


formElement.addEventListener('submit', formSubmitHandler);
openPopupCard.addEventListener('click', openPofilePopup);
closePopupCard.addEventListener('click', closePofilePopup);
