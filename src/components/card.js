import { deletePost } from "./api.js";
import { closePopup, openPopup } from "./modal.js";

export function createPost(config, place, link, likesAmount, owner, postId) {
  const postElement = getTemplate(
    config.postTemplateId,
    config.postElementSelector
  );
  const postImage = postElement.querySelector(config.postImageSelector);
  const postName = postElement.querySelector(config.postNameSelector);
  const postLikeAmount = postElement.querySelector(
    config.postLikeAmountSelector
  );

  // config.popupImage = popupImage;
  // config.imagePopup = imagePopup;
  // config.imageCaption = imageCaption;

  postName.textContent = place;
  postImage.src = link;
  postImage.setAttribute("alt", place);

  postLikeAmount.textContent = likesAmount;
  checkLikeAmount(postLikeAmount, config.postLikeAmountHiddenClass);

  setLikeHandler(
    postElement,
    config.postBtnLikeSelector,
    config.postBtnLikeActiveClass
  );

  if (owner === "efe1922996bcc79103e54788") {
    setDeleteHandler(
      postElement,
      config.postBtnDelSelector,
      config.deletePopup,
      config.postBtnDelConfirmSelector,
      postId
    );
  } else {
    const deleteBtn = postElement.querySelector(config.postBtnDelSelector);
    deleteBtn.setAttribute("disabled", "disabled");
    deleteBtn.style.display = "none";
  }

  setPopupOpenHandler(
    postImage,
    config.popupImage,
    config.imagePopup,
    link,
    place,
    config.imageCaption
  );
  return postElement;
}

function getTemplate(postId, postSelector) {
  const postTemplate = document.querySelector(postId).content;
  const postElement = postTemplate.querySelector(postSelector).cloneNode(true);
  return postElement;
}

function checkLikeAmount(amountBox, stateClass) {
  if (amountBox.textContent === "0" || amountBox.textContent === 0) {
    amountBox.classList.add(stateClass);
    return;
  }
  amountBox.classList.remove(stateClass);
}

function setLikeHandler(post, btnSelector, stateClass) {
  const likeBtn = post.querySelector(btnSelector);
  likeBtn.addEventListener("click", (evt) => {
    evt.target.classList.toggle(stateClass);
  });
}

function setDeleteHandler(
  post,
  btnSelector,
  deletePopup,
  confirmBtnSelector,
  postId
) {
  const deleteBtn = post.querySelector(btnSelector);
  deleteBtn.addEventListener("click", () => {
    const submitDelBtn = deletePopup.querySelector(confirmBtnSelector);
    openPopup(deletePopup);
    submitDelBtn.addEventListener("click", () => {
			deletePost(postId);
			closePopup(deletePopup);
			post.remove();
		});
  });
}

function setPopupOpenHandler(
  postImage,
  popup,
  imagePopup,
  imageLink,
  place,
  imageCaption
) {
  postImage.addEventListener("click", () => {
    imagePopup.src = imageLink;
    imagePopup.setAttribute("alt", place);
    imageCaption.textContent = place;
    openPopup(popup);
  });
}
