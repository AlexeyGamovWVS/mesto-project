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

export { openPopup, closePopup };