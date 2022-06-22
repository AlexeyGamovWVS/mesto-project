import { closePopup } from "./modal.js";
import { addPostIntoStart } from "./utils.js";

export function setPostAddSubmitListener({form, popup}, config) {
  const inputPlace = form.elements.place;
  const inputLink = form.elements.imgLink;
  form.addEventListener("submit", (evt) => {
    evt.preventDefault();
    addPostIntoStart(config, inputPlace.value, inputLink.value);
    evt.target.reset();
    closePopup(popup);
  });
}