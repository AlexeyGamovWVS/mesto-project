import {createPost} from "./card.js";
import { popupImage, imagePopup, imageCaption } from "./index.js";

const karachaevskImage = new URL('../images/karachaevsk.jpeg', import.meta.url);
const elbrusImage = new URL('../images/elbrus.jpeg', import.meta.url);
const dombaiImage = new URL('../images/domaby.jpeg', import.meta.url);
const matternImage = new URL('../images/mattern.jpeg', import.meta.url);
const serroImage = new URL('../images/serro.jpeg', import.meta.url);
const rechimeImage = new URL('../images/rechime.jpeg', import.meta.url);
const initialCards = [
  {
    name: "Карачаевск",
    link: karachaevskImage,
  },
  {
    name: "Гора Эльбрус",
    link: elbrusImage,
  },
  {
    name: "Домбай",
    link: dombaiImage,
  },
  {
    name: "Маттерхорн",
    link: matternImage,
  },
  {
    name: "Серро-Торре",
    link: serroImage,
  },
  {
    name: "Тре-Чиме-ди-Лаваред",
    link: rechimeImage,
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
  initialCards.forEach((item) => renderCard(config, item.name, item.link));
}

export function renderCard({sectionSelector, ...rest}, place, link) {
  const section = document.querySelector(sectionSelector);
  section.prepend(createPost(rest, place, link));
}

export function toggleButtonState(form, button, stateClass) {
  const isValid = form.checkValidity();
  if (!isValid) {
    button.classList.add(stateClass);
    button.disabled = "disabled";
  } else {
    button.classList.remove(stateClass);
    button.disabled = false;
  }
}

export function resetFormErrors(inputs, {labelSelector, errorElementSelector, inputErrorClass, errorElementClass}) {
  const inputsList = Array.from(inputs);
  inputsList.forEach(input => {
    const errorElement = input.closest(labelSelector).querySelector(errorElementSelector);
    input.classList.remove(inputErrorClass);
    errorElement.classList.remove(errorElementClass);
  })
}

export function changeProfile(profileName, profileStatus, inputName, inputDescr) {
  profileName.textContent = inputName.value;
  profileStatus.textContent = inputDescr.value;
}

export { postCreationConfig }