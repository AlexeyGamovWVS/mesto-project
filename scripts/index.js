import { enableValidation } from "./validate.js";
import { openPopup, closePopup } from "./modal.js";
import { renderInitialCards } from "./initialCards.js";

// ====== DOM Elements for changing ======
const profileName = document.querySelector(".profile__name");
const profileStatus = document.querySelector(".profile__status");

// ====== pop-ups ======
const editPop = document.querySelector("#edit-profile-popup");
const addPop = document.querySelector("#post-add-popup");

// ====== forms & inputs ======
const profileForm = document.forms.profileEditForm;
const addPostForm = document.forms.addPostForm;

const inputName = profileForm.elements.author;
const inputDescr = profileForm.elements.status;

// ====== buttons ======
const editProfileBtn = document.querySelector("#edit-profile");
const postAddButton = document.querySelector("#add-btn");
const closeButtons = document.querySelectorAll(".popup__btn-close");

// ====== configs =======

const initialCards = [
  {
    name: "Карачаевск",
    link: "./images/karachaevsk.jpeg",
  },
  {
    name: "Гора Эльбрус",
    link: "./images/elbrus.jpeg",
  },
  {
    name: "Домбай",
    link: "./images/domaby.jpeg",
  },
  {
    name: "Маттерхорн",
    link: "./images/mattern.jpeg",
  },
  {
    name: "Серро-Торре",
    link: "./images/serro.jpeg",
  },
  {
    name: "Тре-Чиме-ди-Лаваред",
    link: "./images/rechime.jpeg",
  },
  {
    name: "Архыз",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    name: "Челябинская область",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Камчатка",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
];

const postCreationConfig = {
  sectionSelector: ".posts__container",
  postElementSelector: ".post",
  postImageSelector: ".post__img",
  postNameSelector: ".post__name",
  postBtnLikeSelector: ".post__btn-like",
  postBtnLikeActiveClass: "post__btn-like_active",
  postBtnDelSelector: ".post__delete",
  postTemplateId: "#post",
  postImagePopupSelector: "#post-popup",
  postImagePopupItemSelector: ".popup__img-item",
  postImagePopupCaptionSelector: ".popup__img-caption",
};

const validateConfig = {
  inputSelector: ".form__item",
  inputErrorClass: "form__item_type_error",
  submitButtonSelector: ".form__btn-save",
  inactiveButtonClass: "form__btn-save_disabled",
  errorElementSelector: ".form__input-error",
  errorElementClass: "form__input-error_active",
  labelSelector: ".form__field",
};

const postFormConfig = {
  popup: addPop,
  form: addPostForm,
};

const profileFormConfig = {
  popup: editPop,
  form: profileForm,
  profileName: profileName,
  profileStatus: profileStatus,
  inputName: inputName,
  inputDescr: inputDescr,
};

//====== functions ======

function setPostAddSubmitListener({ form, popup }, config) {
  const inputPlace = form.elements.place;
  const inputLink = form.elements.imgLink;
  form.addEventListener("submit", (evt) => {
    evt.preventDefault();
    addPostIntoStart(config, inputPlace.value, inputLink.value);
    evt.target.reset();
    closePopup(popup);
  });
}

function setProfileSubmitListener({ form, popup, ...rest }) {
  form.addEventListener("submit", (evt) => {
    evt.preventDefault();
    changeProfile(rest);
    closePopup(popup);
  });
}

function changeProfile({ profileName, profileStatus, inputName, inputDescr }) {
  profileName.textContent = inputName.value;
  profileStatus.textContent = inputDescr.value;
}

function renderInitialCards(arr, config) {
  arr.forEach((item) => addPostIntoStart(config, item.name, item.link));
}


//====== processing & initialazing ======

inputName.value = profileName.textContent;
inputDescr.value = profileStatus.textContent;

editProfileBtn.addEventListener("click", () => openPopup(editPop));
postAddButton.addEventListener("click", () => openPopup(addPop));
closeButtons.forEach((button) => {
  const popup = button.closest(".popup");
  button.addEventListener("click", () => closePopup(popup));
});

renderInitialCards(initialCards, postCreationConfig);
enableValidation(validateConfig);
setProfileSubmitListener(profileFormConfig);
setPostAddSubmitListener(postFormConfig, postCreationConfig);