import '../pages/index.css';

import { enableValidation, checkInputValidity } from "./validate.js";
import { openPopup, closePopup } from "./modal.js";
import { renderCard, toggleButtonState, renderInitialCards, postCreationConfig, validateConfig, resetFormErrors, changeProfile } from "./utils.js";

// ====== DOM Elements for changing ======
const profileName = document.querySelector(".profile__name");
const profileStatus = document.querySelector(".profile__status");

// ====== pop-ups ======
const editPop = document.querySelector("#edit-profile-popup");
const addPop = document.querySelector("#post-add-popup");

export const popupImage = document.querySelector("#post-popup");
export const imagePopup = popupImage.querySelector(".popup__img-item");
export const imageCaption = popupImage.querySelector(".popup__img-caption");

// ====== forms & inputs ======
const profileForm = document.forms.profileEditForm;
const addPostForm = document.forms.addPostForm;

const inputName = profileForm.elements.author;
const inputDescr = profileForm.elements.status;
const inputPlace = addPostForm.elements.place;
const inputLink = addPostForm.elements.imgLink;

// ====== buttons ======
const editProfileBtn = document.querySelector("#edit-profile");
const postAddButton = document.querySelector("#add-btn");
const closeButtons = document.querySelectorAll(".popup__btn-close");

// ====== configs =======

const postFormConfig = {
  popup: addPop,
  form: addPostForm,
  submitButtonSelector: ".form__btn-save",
  stateClass: "form__btn-save_disabled",
  inputPlace: inputPlace,
  inputLink: inputLink,
};

const profileFormConfig = {
  popup: editPop,
  form: profileForm,
  profileName: profileName,
  profileStatus: profileStatus,
  inputName: inputName,
  inputDescr: inputDescr,
};

//====== form functions ======
// ! ДЛЯ РЕВЬЮ.. (по факту можно тоже убрать по своим файлам
// функции обработчиков сабмитов форм, они полностью самостоятельны 
// и управляются конфигами..., но не стал в целях ТЗ)

function setPostAddSubmitListener({ form, popup, inputPlace, inputLink, submitButtonSelector, stateClass }, config) {
  const submitBtn = form.querySelector(submitButtonSelector);
  form.addEventListener("submit", (evt) => { 
    evt.preventDefault();
    renderCard(config, inputPlace.value, inputLink.value);
    evt.target.reset();
    toggleButtonState(form, submitBtn, stateClass);
    closePopup(popup);
  });
}

function setProfileSubmitListener({ form, popup, profileName, profileStatus, inputName, inputDescr }) {
  form.addEventListener("submit", (evt) => {
    evt.preventDefault();
    changeProfile(profileName, profileStatus, inputName, inputDescr);
    closePopup(popup);
  });
}

//====== processing & initialazing ======

editProfileBtn.addEventListener("click", () => {
  inputName.value = profileName.textContent;
  inputDescr.value = profileStatus.textContent;
  resetFormErrors([inputName, inputDescr], validateConfig);
  openPopup(editPop);
});

postAddButton.addEventListener("click", () => {
  resetFormErrors([inputLink, inputPlace], validateConfig);
  openPopup(addPop);
});

closeButtons.forEach((button) => {
  const popup = button.closest(".popup");
  button.addEventListener("click", () => closePopup(popup));
});

renderInitialCards(postCreationConfig);
enableValidation(validateConfig);
setProfileSubmitListener(profileFormConfig);
setPostAddSubmitListener(postFormConfig, postCreationConfig);