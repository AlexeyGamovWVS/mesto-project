import { openPopup } from "./modal.js";

export function createPost(config, place, link) {
  const imgPop = document.querySelector(config.postImagePopupSelector);
  const imgPopItem = imgPop.querySelector(config.postImagePopupItemSelector);
  const imgPopCaption = imgPop.querySelector(config.postImagePopupCaptionSelector);
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
    imgPopItem.src = link;
    imgPopItem.setAttribute("alt", place);
    imgPopCaption.textContent = place;
    openPopup(imgPop);
  });
  // post's buttons processing end
  return postElement;
}
