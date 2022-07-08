import { getInitialCards } from "./api.js";
import { createPost } from "./card.js";

const karachaevskImage = new URL("../images/karachaevsk.jpeg", import.meta.url);
const elbrusImage = new URL("../images/elbrus.jpeg", import.meta.url);
const dombaiImage = new URL("../images/domaby.jpeg", import.meta.url);
const matternImage = new URL("../images/mattern.jpeg", import.meta.url);
const serroImage = new URL("../images/serro.jpeg", import.meta.url);
const rechimeImage = new URL("../images/rechime.jpeg", import.meta.url);

const popupImage = document.querySelector("#post-popup");
const imagePopup = popupImage.querySelector(".popup__img-item");
const imageCaption = popupImage.querySelector(".popup__img-caption");

const postCreationConfig = {
  sectionSelector: ".posts__container",
  postElementSelector: ".post",
  postImageSelector: ".post__img",
  postNameSelector: ".post__name",
  postBtnLikeSelector: ".post__btn-like",
  postBtnLikeActiveClass: "post__btn-like_active",
  postBtnDelSelector: ".post__delete",
	postLikeAmountSelector: ".post__like-amount",
	postLikeAmountHiddenClass: "post__like-amount_hidden",
  postTemplateId: "#post",
  popupImage: popupImage,
  imagePopup: imagePopup,
  imageCaption: imageCaption,
};

export const validateConfig = {
  inputSelector: ".form__item",
  inputErrorClass: "form__item_type_error",
  submitButtonSelector: ".form__btn-save",
  inactiveButtonClass: "form__btn-save_disabled",
  errorElementSelector: ".form__input-error",
  errorElementClass: "form__input-error_active",
  labelSelector: ".form__field",
};

export function renderInitialCards(config) {
  getInitialCards()
    .then((initialCards) => {
      initialCards.forEach((item) => {
        renderCard(config, item.name, item.link, item.likes, item.owner._id);
      });
    })
    .catch((err) => console.error(err));
}

export function renderCard({ sectionSelector, ...rest }, place, link, likes, owner) {
  const section = document.querySelector(sectionSelector);
  section.prepend(createPost(rest, place, link, likes.length, owner));
}

// export function changeProfile(
//   profileName,
//   profileStatus,
//   inputName,
//   inputDescr
// ) {
//   profileName.textContent = inputName.value;
//   profileStatus.textContent = inputDescr.value;
// }

export { postCreationConfig };
