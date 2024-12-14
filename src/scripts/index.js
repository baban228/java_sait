import '../pages/index.css';
import { initialCards } from './cards.js';
import { enableValidation } from './validate.js';


const popupProfile = document.querySelector('.popup_type_profile');                    
const popupOpenEdit = document.querySelector('.profile__edit-buton');                   
const popupFormProfile = popupProfile.querySelector('.popup__form_type_profile');       
const profileName = document.querySelector('.profile-info__title');                     
const profileJob = document.querySelector('.profile-info__intro');                     
const inputName = document.querySelector('.popup__input_type_name');                   
const inputJob = document.querySelector('.popup__input_type_job');                     

const popupPlace = document.querySelector('.popup_type_place');                          
const popupOpenAdd = document.querySelector('.profile__add-button');                     
const popupFormPlace = popupPlace.querySelector('.popup__form_type_place');              
const popupFormTitle = popupPlace.querySelector('.popup__input_type_title');             
const popupFormLink = popupPlace.querySelector('.popup__input_type_link');               

const popupImage = document.querySelector('.popup_type_image');                           
const elementImage = document.querySelector('.popup__img');                               
const elementTitle = document.querySelector('.popup__name');                           

const popupCloseList = document.querySelectorAll('.popup__button-close');                 

const popupClosest = document.querySelectorAll('.popup');                              

const cardTemplate = document.querySelector('.template-card').content;                   
const cardsContainer = document.querySelector('.elements');                              

const bindCardLikeEventListener = (buttonLike) => {
  buttonLike.addEventListener('click', (evt) => {
    evt.target.classList.toggle('element__button_active');
  });
};

const bindCardDeleteEventListener = (cardData) => {
  cardData.addEventListener('click', (evt) => {
    evt.target.closest('.element').remove();
  });
};

const createCard = (cardData) => {
  const cardElement = cardTemplate.cloneNode(true);                                      
  const cardElementTitle = cardElement.querySelector('.element__title');                  
  const cardElementPhoto = cardElement.querySelector('.element__img');                    
  const cardElementLike = cardElement.querySelector('.element__button');               
  const cardElementDel = cardElement.querySelector('.element__basket');                

  cardElementTitle.textContent = cardData.name;                                     
  cardElementPhoto.src = cardData.link;                                   
  cardElementPhoto.alt = cardData.alt;                   

  bindCardPreviewEventListener(cardElementPhoto);                         
  bindCardLikeEventListener(cardElementLike);                                            
  bindCardDeleteEventListener(cardElementDel);                     

  return cardElement;
};


const bindCardPreviewEventListener = (cardImageElement) => {
  cardImageElement.addEventListener('click', (evt) => {
    openPopup(popupImage);

    elementImage.src = cardImageElement.src;
    elementImage.alt = cardImageElement.alt;
    elementTitle.textContent = evt.target.closest('.element').textContent;
  });
};


initialCards.forEach((cardData) => {
  cardsContainer.append(createCard(cardData));
});

const openPopup = (popup) => {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', popupCloseEscapeKey);
};


const closePopup = (popup) => {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', popupCloseEscapeKey);
};

const popupCloseEscapeKey = (evt) => {
  if (evt.key === 'Escape'){
    popupClosest.forEach((popup) => {
      closePopup(popup);
    })
  }
}

popupOpenEdit.addEventListener('click', () => {
  openPopup(popupProfile);
  inputName.value = profileName.textContent;
  inputJob.value = profileJob.textContent;
});

popupFormProfile.addEventListener('submit', (evt) => {
  evt.preventDefault();

  profileName.textContent = inputName.value;
  profileJob.textContent = inputJob.value;
  closePopup(popupProfile);
});

popupCloseList.forEach((item) => {
  item.addEventListener('click', (evt) => {
    const popupClosestCross = popupAddClosest(evt);
    closePopup(popupClosestCross);
  });
});

popupClosest.forEach((item) => {
  item.addEventListener('click', (evt) => {
    if (evt.target === evt.currentTarget) {
      const popupClosestOverlay = popupAddClosest(evt);
      closePopup(popupClosestOverlay);
    };
  });
});

popupOpenAdd.addEventListener('click', () => {
  openPopup(popupPlace);
  popupFormTitle.value = '';
  popupFormLink.value = '';
});

popupFormPlace.addEventListener('submit', (evt) => {
  evt.preventDefault();

  renderCard({
    name: popupFormTitle.value,
    link: popupFormLink.value,
  });

  evt.target.reset();
  closePopup(popupPlace);
});

const renderCard = (card) => {
  cardsContainer.prepend(createCard(card));
};

const popupAddClosest = (evt) => {
  return evt.target.closest('.popup');
}
enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
});
