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

const closeButtons = document.querySelectorAll(".popup__btn-close");

closeButtons.forEach((button) => {
  const popup = button.closest(".popup");
  button.addEventListener("click", () => closePopup(popup));
});

export { openPopup, closePopup };