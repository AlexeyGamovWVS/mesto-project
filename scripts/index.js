import { enableValidation } from "./validate.js";
import { openPopup, closePopup } from "./modal.js";
import { renderInitialCards, addPostIntoStart } from "./card.js";

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
const inputPlace = addPostForm.elements.place;
const inputLink = addPostForm.elements.imgLink;

// ====== buttons ======
const editProfileBtn = document.querySelector("#edit-profile");
const postAddButton = document.querySelector("#add-btn");

// ====== buttons processing ======
editProfileBtn.addEventListener("click", () => {
  inputName.value = profileName.textContent;
  inputDescr.value = profileStatus.textContent;
  openPopup(editPop)});

postAddButton.addEventListener("click", () => openPopup(addPop));

// ====== Profile Processing ======
profileForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  changeProfile();
  evt.target.reset();
  closePopup(editPop);
});

const changeProfile = () => {
  profileName.textContent = inputName.value;
  profileStatus.textContent = inputDescr.value;
};

// ====== Post Form Processing ======
addPostForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  addPostIntoStart(inputPlace.value, inputLink.value);
  evt.target.reset();
  closePopup(addPop);
});

renderInitialCards();
enableValidation();