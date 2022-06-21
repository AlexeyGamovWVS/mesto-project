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
  window.addEventListener("keydown", closePopupByEsc);
};
const closePopup = (pop) => {
  pop.classList.remove("popup_opened");
  pop.removeEventListener("click", closePopupByOverlay);
  window.removeEventListener("keydown", closePopupByEsc);
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

const changeProfile = () => {
  profileName.textContent = inputName.value;
  profileStatus.textContent = inputDescr.value;
};

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

// Себе на память...
// Небезопасное добавление постов
// posts.insertAdjacentHTML('afterbegin', `
//   <li class="post">
//     <img
//       src="${inLink}"
//       class="post__img"
//     />
//     <div class="post__description-row">
//       <h3 class="post__name">${inPlace}</h3>
//       <button type="button" class="post__btn-like"></button>
//     </div>
//   </li>
// `);
//
//

// FORM LIVE VALIDATION START //

function enableValidation() {
  const listForm = Array.from(document.forms);
  listForm.forEach((formElement) => {
    setEventListeners(formElement);
  });
}

function setEventListeners(formElement) {
  const inputList = Array.from(formElement.querySelectorAll(".form__item"));
  const buttonElement = formElement.querySelector(".form__btn-save");

  toggleButtonState(inputList, buttonElement);

  inputList.forEach((inputItem) => {
    inputItem.addEventListener("input", function () {
      checkInputValidity(formElement, inputItem);
      toggleButtonState(inputList, buttonElement);
    });
  });
}

function checkInputValidity(formElement, inputElement) {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement);
  }
}

function toggleButtonState(inputList, buttonElement) {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add("form__btn-save_disabled");
  } else {
    buttonElement.classList.remove("form__btn-save_disabled");
  }
}

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

function showInputError(formElement, inputElement, errorMessage) {
  const errorElement = formElement.querySelector(
    `.${inputElement.id}-input-error`
  );
  inputElement.classList.add("form__item_type_error");
  errorElement.textContent = errorMessage;
  errorElement.classList.add("form__input-error_active");
}

function hideInputError(formElement, inputElement) {
  const errorElement = formElement.querySelector(
    `.${inputElement.id}-input-error`
  );
  inputElement.classList.remove("form__item_type_error");
  errorElement.textContent = "";
  errorElement.classList.remove("form__input-error_active");
}

enableValidation();

// FORM LIVE VALIDATION END //