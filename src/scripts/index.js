'use strict';

import '../pages/index.css';
import { apiSettings, validationSettings } from "../utils/const.js"; /** ��������� */
import { Card } from "./card.js";
import { FormValidator } from "./validator.js";
import { Section } from './Section.js'
import { PopupWithForm } from './PopupWithForm.js';
import { PopupWithImage } from './PopupWithImage.js';
import { PopupWithConfirmation } from './PopupWithConfirmation.js';
import { UserInfo } from './UserInfo.js';
import { Api } from './Api.js';

/** ��������� API
 * @type {Api} */
const api = new Api(apiSettings);

/** ID ������������� ������������
 * @type {string} */
let currentUser = '';


/** ������������ ��������� ������ ������������ � ������� �������� */
Promise.all([api.getUserInfo(), api.getCards()])
    .then((res) => {
        currentUser = res[0]._id;
        console.log('ID ������������:', currentUser); // ������� ID � �������
        /** �� ���������� 1 ������� �������� �� ������������, � ������ ������� */
        profile.setUserInfo(res[0]);
        sectionPhotoCards.renderElements(res[1]); /** �� ���������� ������� - �������� */
    })
    .catch((err) => {
        console.log(err);
    });
/** ������� ����� ������ ��� ������� @type {Section} */
const sectionPhotoCards = new Section({
    renderer: (item) => {
        sectionPhotoCards.addItem(copyCard(item, currentUser))
    }
}, '.photo-cards');

/** ������� ������������ */

/** ����� �������������� �������
 * @type {Element} */
const formProfileEdit = document.querySelector(".popup_edit_profile " + validationSettings.formSelector);

/** ����� �������������� �������
 * @type {Element} */
const formAvatarEdit = document.querySelector(".popup_update-avatar " + validationSettings.formSelector);

/** ��������� ���������� ��� ����� �������������� �������
 * @type {FormValidator} */
const profileEditValidator = new FormValidator(validationSettings, formProfileEdit);

/** ��������� ���������� ��� ����� �������������� �������
 * @type {FormValidator} */
const avatarEditValidator = new FormValidator(validationSettings, formAvatarEdit);

/** ���������� �������������� ������� */
/** @type {HTMLElement} */
const profileEditPopup = document.querySelector(".popup_edit_profile");

/** ��� ������������ � ���������� �������������� ������� */
/** @type {HTMLInputElement} */
const popupTitleInput = profileEditPopup.querySelector('#profile_name');

/** ������� ������������ � ���������� �������������� ������� */
/** @type {HTMLInputElement} */
const popupAboutInput = profileEditPopup.querySelector('#profile_about');

/** ������ �������������� ������� */
/** @type {HTMLElement} */
const profileEditButton = document.querySelector(".profile__button");

/** ��������� ������� ������������ */
const profile = new UserInfo(
    {
        profileTitle: ".profile__title",
        profileAbout: ".profile__about",
        profileAvatar: ".profile__avatar"
    }
);

/** ��������� ����� �������������� ������� */
const profileForm = new PopupWithForm(
    ".popup_edit_profile",
    {
        handleSubmitForm: (inputValues) => {
            api.sendUserInfo(inputValues)
                .then((data) => {
                    profile.setUserInfo(
                        { name: data.name, about: data.about, avatar: data.avatar }
                    );
                    profileForm.close();
                })
                .catch((err) => {
                    console.log(err);
                })
                .finally(() => {
                    profileForm.renderLoading(false);
                })
        }
    });

/** ����������� ������� � ����� �������������� ������� ��������
 * @param info ������ �������� {title: title, about: about} */
const setProfileInputs = (info) => {
    popupTitleInput.value = info.title;
    popupAboutInput.value = info.about;
};

const avatarEditButton = document.querySelector(".profile__edit-avatar-button");

avatarEditButton.addEventListener('click', () => {
    avatarForm.open();
    avatarEditValidator.validateInputs();
    avatarEditValidator.switchSubmitButton();
})

/** ��������� ����� �������������� ������� */
const avatarForm = new PopupWithForm(
    ".popup_update-avatar",
    {
        handleSubmitForm: (inputValues) => {
            api.updateAvatar(inputValues.avatar)
                .then((res) => {
                    profile.setUserInfo({ avatar: res.avatar, name: res.name, about: res.about });
                    avatarForm.close();
                })
                .catch((err) => {
                    console.log(err);
                })
                .finally(() => {
                    avatarForm.renderLoading(false);
                })
        }
    })

/** �������� ����������� */

/** ����� ���������� ��������
 * @type {Element} */
const formNewPlace = document.querySelector(".popup_new-place " + validationSettings.formSelector);

/** ��������� ���������� ��� ����� ���������� ��������
 * @type {FormValidator} */
const newPlaceValidator = new FormValidator(validationSettings, formNewPlace);

/** ��������� ���������� ��������� ����������� */
const popupImage = new PopupWithImage('.popup_view_image');

/** ��������� ���������� ������������� �������� �������� */
const popupImageDelete = new PopupWithConfirmation(
    '.popup_delete-place',
    {
        handleSubmitDelete: (id, element) => {
            api.deleteCard(id)
                .then(() => {
                    element.deleteCard();
                    popupImageDelete.close();
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    }
);

/** ������ �������� ����� */
/** @type {HTMLButtonElement} */
const buttonAddPlace = document.querySelector(".profile__add-button");

/** ������� ���������� ��������
 * @param item - ������� �������� {name, link}
 * @param currentUser
 * @returns {Node} - ������� ���� �������� � ���������������� */
const copyCard = (item, currentUser) => {
    const card = new Card({
        item, currentUser,
        handleCardClick: () => {
            popupImage.open({ title: item.name, src: item.link });
        },
        handleDeleteCard: (id, element) => {
            popupImageDelete.open(card);
            popupImageDelete.getCard(id, element)
        },
        handleLikeCard: {
            handleSetLike: (id) => {
                api.setLike(id)
                    .then((res) => {
                        card.updateLikes(res.likes, "setLike");
                    })
                    .catch((err) => {
                        console.log(err);
                    })
            },
            handleDeleteLike: (id) => {
                api.deleteLike(id)
                    .then((res) => {
                        card.updateLikes(res.likes, "deleteLike");
                    })
                    .catch((err) => {
                        console.log(err);
                    })

            }
        }
    },
        "#photo-card");
    return card.createCard();
}

/** ��������� ����� ���������� �������� */
const addPhotoForm = new PopupWithForm(
    ".popup_new-place",
    {
        handleSubmitForm: (inputValues) => {
            api.sendCard(inputValues)
                .then((data) => {
                    sectionPhotoCards.addNewItem(copyCard(data, currentUser));
                    addPhotoForm.close();
                })
                .finally(() => {
                    addPhotoForm.renderLoading(false);
                })
        }
    });


/** �������������� ������� �� ������ �������������� ������� */
profileEditButton.addEventListener('click', function () {
    setProfileInputs(profile.getUserInfo());
    profileForm.open();
    profileEditValidator.validateInputs();
    profileEditValidator.switchSubmitButton();
})

/** �������������� ������� �� ������ �������� ����� */
buttonAddPlace.addEventListener('click', function () {
    addPhotoForm.open();
    newPlaceValidator.validateInputs();
    /** ��������, ������, �� ���� ����� �������, ����� ���� �� ��������� */
    newPlaceValidator.switchSubmitButton();
})

/** ���� �������� DOM */
document.addEventListener('DOMContentLoaded', function () {

    /** �������� ��������� */
    profileEditValidator.enableValidation();
    newPlaceValidator.enableValidation();
    avatarEditValidator.enableValidation()

    /** ������ �������������� ���������� ����������� */
    popupImage.setEventListeners();

    /** ������ �������������� ���������� �������������� ������� */
    profileForm.setEventListeners();

    /** ������ �������������� ���������� �������� �������� */
    popupImageDelete.setEventListeners();

    /** ������ �������������� ���������� ���������� �������� */
    addPhotoForm.setEventListeners();

    /** ������ �������������� ���������� �������������� ������� */
    avatarForm.setEventListeners();
});
