import {enableValidation} from './validation.js';
// ====== DOM Elements for changing ======
const profileName = document.querySelector(".profile__name");
const profileStatus = document.querySelector(".profile__status");
const posts = document.querySelector(".posts__container");
const postTemplate = document.querySelector("#post").content;

// ====== pop-ups ======
const editPop = document.querySelector("#edit-profile-popup");
const addPop = document.querySelector("#post-add-popup");
const imgPop = document.querySelector("#post-popup");

// ====== pop-up constants ======
const imgPopItem = imgPop.querySelector(".popup__img-item");
const imgPopCaption = imgPop.querySelector(".popup__img-caption");

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

// ====== Initial Cards ======
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

// ====== buttons processing ======
const openPopup = (pop) => {
  pop.classList.add("popup_opened");
  pop.addEventListener("click", closePopupByOverlay);
  document.addEventListener("keydown", closePopupByEsc);
};
const closePopup = (pop) => {
  pop.classList.remove("popup_opened");
  pop.removeEventListener("click", closePopupByOverlay);
  document.removeEventListener("keydown", closePopupByEsc);
};

editProfileBtn.addEventListener("click", () => openPopup(editPop));
postAddButton.addEventListener("click", () => openPopup(addPop));

closeButtons.forEach((button) => {
  const popup = button.closest(".popup");
  button.addEventListener("click", () => closePopup(popup));
});

function closePopupByOverlay(evt) {
  const activePop = document.querySelector(".popup_opened");
  if (evt.target.classList.contains("popup")) {
    closePopup(activePop);
  }
}

function closePopupByEsc(evt) {
  const activePop = document.querySelector(".popup_opened");
  if (evt.key === "Escape") {
    closePopup(activePop);
  }
}

// ====== Profile Processing ======
inputName.value = profileName.textContent;
inputDescr.value = profileStatus.textContent;

function changeProfile() {
  profileName.textContent = inputName.value;
  profileStatus.textContent = inputDescr.value;
}

profileForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  changeProfile();
  closePopup(editPop);
});

// ====== Post Creation ======
function createPost(place, link) {
  const postElement = postTemplate.querySelector(".post").cloneNode(true);
  const postImage = postElement.querySelector(".post__img");
  const postName = postElement.querySelector(".post__name");

  postName.textContent = place;
  postImage.src = link;
  postImage.setAttribute("alt", place);

  // post's buttons processing start
  postElement
    .querySelector(".post__btn-like")
    .addEventListener("click", (evt) =>
      evt.target.classList.toggle("post__btn-like_active")
    );
  postElement
    .querySelector(".post__delete")
    .addEventListener("click", () => postElement.remove());

  postImage.addEventListener("click", () => {
    imgPopItem.src = link;
    imgPopItem.setAttribute("alt", place);
    imgPopCaption.textContent = place;
    openPopup(imgPop);
  });
  // post's buttons processing end
  return postElement;
}

const addPostIntoStart = (place, link) => {
  posts.prepend(createPost(place, link));
};

// ====== Post Form Processing ======
addPostForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  addPostIntoStart(inputPlace.value, inputLink.value);
  evt.target.reset();
  closePopup(addPop);
});

// ====== Initialize Posts =======
function renderInitialCards() {
  initialCards.forEach((item) => addPostIntoStart(item.name, item.link));
}

renderInitialCards();

const validateConfig = {
  inputSelector: ".form__item",
  inputErrorClass: "form__item_type_error",
  submitButtonSelector: ".form__btn-save",
  inactiveButtonClass: "form__btn-save_disabled",
  errorElementSelector: ".form__input-error",
  errorElementClass: "form__input-error_active",
  labelSelector: ".form__field",
};

enableValidation(validateConfig);