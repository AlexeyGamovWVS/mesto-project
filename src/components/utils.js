import {createPost} from "./card.js";
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