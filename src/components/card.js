import { openPopup } from "./modal.js";

export function createPost(config, place, link) {
  const postTemplate = document.querySelector(config.postTemplateId).content;
  const postElement = postTemplate
    .querySelector(config.postElementSelector)
    .cloneNode(true);
  const postImage = postElement.querySelector(config.postImageSelector);
  const postName = postElement.querySelector(config.postNameSelector);

  postName.textContent = place;
  postImage.src = link;
  postImage.setAttribute("alt", place);

  // post's buttons processing start
  postElement
    .querySelector(config.postBtnLikeSelector)
    .addEventListener("click", (evt) =>
      evt.target.classList.toggle(config.postBtnLikeActiveClass)
    );
  postElement
    .querySelector(config.postBtnDelSelector)
    .addEventListener("click", () => postElement.remove());

  postImage.addEventListener("click", () => {
    config.imagePopup.src = link;
    config.imagePopup.setAttribute("alt", place);
    config.imageCaption.textContent = place;
    openPopup(config.popupImage);
  });
  // post's buttons processing end
  return postElement;
}
