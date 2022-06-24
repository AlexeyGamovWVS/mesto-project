import { openPopup } from "./modal.js";

export function createPost(config, place, link) {
  const postElement = getTemplate(config.postTemplateId, config.postElementSelector);
  const postImage = postElement.querySelector(config.postImageSelector);
  const postName = postElement.querySelector(config.postNameSelector);

  postName.textContent = place;
  postImage.src = link;
  postImage.setAttribute("alt", place);

  setLikeHandler(postElement, config.postBtnLikeSelector, config.postBtnLikeActiveClass);
  setDeleteHandler(postElement, config.postBtnDelSelector);
  setPopupOpenHandler(postImage, config.popupImage, config.imagePopup, link, place, config.imageCaption);

  return postElement;
}

function getTemplate(postId, postSelector) {
  const postTemplate = document.querySelector(postId).content;
  const postElement = postTemplate
    .querySelector(postSelector)
    .cloneNode(true);
  return postElement;
}

function setLikeHandler(post, btnSelector, stateClass) {
  const likeBtn = post.querySelector(btnSelector);
  likeBtn.addEventListener("click", (evt) =>
    evt.target.classList.toggle(stateClass)
  );
}

function setDeleteHandler(post, btnSelector) {
  const deleteBtn = post.querySelector(btnSelector);
  deleteBtn.addEventListener("click", () => post.remove());
}

function setPopupOpenHandler(postImage, popup, imagePopup, imageLink, place, imageCaption) {
  postImage.addEventListener("click", () => {
    imagePopup.src = imageLink;
    imagePopup.setAttribute("alt", place);
    imageCaption.textContent = place;
    openPopup(popup);
  })
}