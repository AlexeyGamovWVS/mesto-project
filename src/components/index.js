import "../pages/index.css";

import {
  enableValidation,
  toggleButtonState,
  resetFormErrors,
} from "./validate.js";

import { openPopup, closePopup } from "./modal.js";

import {
  renderCard,
  renderInitialCards,
  postCreationConfig,
  validateConfig,
  renderLoading,
  //  changeProfile,
} from "./utils.js";

import {
  getInitialCards,
  getUserInfo,
  sendPost,
  sendUserData,
  sendUserPhoto,
} from "./api.js";

// ====== DOM Elements for changing ======
const profileName = document.querySelector(".profile__name");
const profileStatus = document.querySelector(".profile__status");
const profileImage = document.querySelector(".profile__photo-item");
let userId;

const user = {
  userName: profileName,
  userStatus: profileStatus,
  userImage: profileImage,
  userId: userId,
};

// ====== pop-ups ======
const editPop = document.querySelector("#edit-profile-popup");
const addPop = document.querySelector("#post-add-popup");
const profileImagePop = document.querySelector("#edit-profile-image-popup");

// ====== forms & inputs ======
const profileForm = document.forms.profileEditForm;
const addPostForm = document.forms.addPostForm;
const profileImageForm = document.forms.profileImageForm;

const inputName = profileForm.elements.author;
const inputDescr = profileForm.elements.status;
const inputPlace = addPostForm.elements.place;
const inputLink = addPostForm.elements.imgLink;
const inputProfileImage = profileImageForm.elements.imgProfileLink;

// ====== buttons ======
const editProfileBtn = document.querySelector("#edit-profile");
const postAddButton = document.querySelector("#add-btn");
const closeButtons = document.querySelectorAll(".popup__btn-close");
const editImageProfileBtn = document.querySelector(".profile__photo-item");

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
  inputName: inputName,
  inputDescr: inputDescr,
  submitSelector: ".form__btn-save",
};

const profileImageFormConfig = {
  popup: profileImagePop,
  form: profileImageForm,
  input: inputProfileImage,
  submitSelector: ".form__btn-save",
  stateClass: "form__btn-save_disabled",
};

//====== form functions ======

function setPostAddSubmitListener(
  { form, popup, inputPlace, inputLink, submitButtonSelector, stateClass },
  config
) {
  const submitBtn = form.querySelector(submitButtonSelector);
  form.addEventListener("submit", (evt) => {
    evt.preventDefault();
    renderLoading(true, submitBtn);
    sendPost(inputPlace.value, inputLink.value)
      .then((res) => {
        renderCard(config, res.name, res.link, res.likes, res.owner._id, res._id);
        closePopup(popup);
        evt.target.reset();
        toggleButtonState(form, submitBtn, stateClass);
      })
      .catch((err) => {
        console.error(err);
      })
			.finally(() => {
				renderLoading(false, submitBtn);
			});
  });
}

function setProfileSubmitListener({
  form,
  popup,
  inputName,
  inputDescr,
  submitSelector,
}) {
  const submitBtn = form.querySelector(submitSelector);
  form.addEventListener("submit", (evt) => {
    evt.preventDefault();
    renderLoading(true, submitBtn);
    sendUserData(inputName.value, inputDescr.value)
      .then((data) => {
        user.userName.textContent = data.name;
        user.userStatus.textContent = data.about;
        user.userImage.src = data.avatar;
        closePopup(popup);
      })
      .catch((err) => {
        console.error(err);
      })
			.finally(() => {
				renderLoading(false, submitBtn);
			});
  });
}

function setProfileImageFormListener(config) {
  const submitBtn = config.form.querySelector(config.submitSelector);
  config.form.addEventListener("submit", (evt) => {
    evt.preventDefault();
    renderLoading(true, submitBtn);
    sendUserPhoto(config.input.value)
      .then((data) => {
        user.userName.textContent = data.name;
        user.userStatus.textContent = data.about;
        user.userImage.src = data.avatar;
				evt.target.reset();
        toggleButtonState(config.form, submitBtn, config.stateClass);
        closePopup(config.popup);
      })
      .catch((err) => {
        console.error(err);
      })
			.finally(() => {
				renderLoading(false, submitBtn);
			});
  });
}

//====== processing & initialazing ======

editProfileBtn.addEventListener("click", () => {
  inputName.value = profileName.textContent;
  inputDescr.value = profileStatus.textContent;
  resetFormErrors([inputName, inputDescr], validateConfig);
  openPopup(editPop);
});

editImageProfileBtn.addEventListener("click", () => {
  resetFormErrors([inputProfileImage], validateConfig);
  openPopup(profileImagePop);
});

postAddButton.addEventListener("click", () => {
  resetFormErrors([inputLink, inputPlace], validateConfig);
  openPopup(addPop);
});

closeButtons.forEach((button) => {
  const popup = button.closest(".popup");
  button.addEventListener("click", () => closePopup(popup));
});

Promise.all([getUserInfo(), getInitialCards()])
  .then(([profile, cards]) => {
    user.userName.textContent = profile.name;
    user.userStatus.textContent = profile.about;
    user.userImage.src = profile.avatar;
    user.userId = profile._id;
    postCreationConfig.userId = user.userId;
    renderInitialCards(postCreationConfig, cards);
		enableValidation(validateConfig);
		setProfileSubmitListener(profileFormConfig);
		setPostAddSubmitListener(postFormConfig, postCreationConfig);
		setProfileImageFormListener(profileImageFormConfig);
  })
  .catch((err) => {
    console.error(`${err} Отказано в доступе или умер сервер`);
  });
