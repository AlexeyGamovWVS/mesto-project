function openPopup(popup) {
  popup.classList.add("popup_opened");
  popup.addEventListener("click", closePopupByOverlay);
  document.addEventListener("keydown", closePopupByEsc);
}

function closePopup(popup) {
  popup.classList.remove("popup_opened");
  popup.removeEventListener("click", closePopupByOverlay);
  document.removeEventListener("keydown", closePopupByEsc);
}

function closePopupByOverlay(evt) {
  closePopup(evt.target);
}

function closePopupByEsc(evt) {
  if (evt.key === "Escape") {
		const activePop = document.querySelector(".popup_opened");
    closePopup(activePop);
  }
}

export { openPopup, closePopup };