import { openPopup } from "./modal.js";

const posts = document.querySelector(".posts__container");
const postTemplate = document.querySelector("#post").content;
const imgPop = document.querySelector("#post-popup");
const imgPopItem = imgPop.querySelector(".popup__img-item");
const imgPopCaption = imgPop.querySelector(".popup__img-caption");

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

// ====== Initialize Posts =======
function renderInitialCards() {
  initialCards.forEach((item) => addPostIntoStart(item.name, item.link));
}

function addPostIntoStart(place, link) {
  posts.prepend(createPost(place, link));
}

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

export { renderInitialCards, addPostIntoStart };
