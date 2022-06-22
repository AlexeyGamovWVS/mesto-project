import { closePopup } from "./modal.js";

export function setProfileSubmitListener({form, popup, ...rest}) {
  form.addEventListener("submit", (evt) => {
    evt.preventDefault();
    changeProfile(rest);
    closePopup(popup);
  });
}

function changeProfile({profileName, profileStatus, inputName, inputDescr}) {
  profileName.textContent = inputName.value;
  profileStatus.textContent = inputDescr.value;
}