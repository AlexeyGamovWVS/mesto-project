import { deleteLike, deletePost, sendLike } from "./api.js";
import { closePopup, openPopup } from "./modal.js";

export function createPost(config, place, link, likes, owner, postId) {
  const postElement = getTemplate(
    config.postTemplateId,
    config.postElementSelector
  );
  const postImage = postElement.querySelector(config.postImageSelector);
  const postName = postElement.querySelector(config.postNameSelector);
  const postLikeAmount = postElement.querySelector(
    config.postLikeAmountSelector
  );
  const likesAmount = likes.length;

  postName.textContent = place;
  postImage.src = link;
  postImage.setAttribute("alt", place);

  updateLikeStatus(
    likes,
    postElement,
    config.postBtnLikeSelector,
    config.postBtnLikeActiveClass
  );

  updateLikesAmount(
    likesAmount,
    postLikeAmount,
    config.postLikeAmountHiddenClass
  );

  setDeleteHandler(
    postElement,
    config.postBtnDelSelector,
    config.deletePopup,
    config.postBtnDelConfirmSelector,
    postId,
    owner
  );

  setLikeHandler(
    postElement,
    config.postBtnLikeSelector,
    config.postBtnLikeActiveClass,
    postId,
    config.postLikeAmountHiddenClass,
    postLikeAmount
  );

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

function updateLikeStatus(likes, post, btnSelector, classActive) {
  if (isLiked(likes)) {
    post.querySelector(btnSelector).classList.add(classActive);
    return;
  }
  post.querySelector(btnSelector).classList.remove(classActive);
}

function isLiked(likes) {
  const isMyLike = likes.some((item) => {
    return item._id === "efe1922996bcc79103e54788";
  });
  return isMyLike;
}

function updateLikesAmount(amount, amountBox, stateClass) {
  amountBox.textContent = amount;
  checkLikeAmount(amountBox, stateClass);
}

function checkLikeAmount(amountBox, stateClass) {
  if (amountBox.textContent === "0" || amountBox.textContent === 0) {
    amountBox.classList.add(stateClass);
    return;
  }
  amountBox.classList.remove(stateClass);
}

function setDeleteHandler(
  post,
  btnSelector,
  deletePopup,
  confirmBtnSelector,
  postId,
  owner
) {
  const deleteBtn = post.querySelector(btnSelector);
  if (owner === "efe1922996bcc79103e54788") {
    deleteBtn.addEventListener("click", () => {
      const submitDelBtn = deletePopup.querySelector(confirmBtnSelector);
      openPopup(deletePopup);
      submitDelBtn.addEventListener("click", () => {
        deletePost(postId);
        closePopup(deletePopup);
        post.remove();
      });
    });
    return;
  }
  deleteBtn.setAttribute("disabled", "disabled");
  deleteBtn.style.display = "none";
}

function setLikeHandler(
  post,
  btnSelector,
  stateClass,
  postId,
  amountHiddenClass,
  amountBox
) {
  const likeBtn = post.querySelector(btnSelector);
  likeBtn.addEventListener("click", (evt) => {
    const likeElement = evt.target;
    const likeStatus = likeElement.classList.contains(stateClass);

    if (!likeStatus) {
      likeElement.classList.toggle(stateClass);
      sendLike(postId)
        .then((res) => {
          updateLikesAmount(res.likes.length, amountBox, amountHiddenClass);
        })
        .catch((err) => console.log(err));
    } else {
      likeElement.classList.toggle(stateClass);
      deleteLike(postId)
        .then((res) => {
          updateLikesAmount(res.likes.length, amountBox, amountHiddenClass);
        })
        .catch((err) => console.log(err));
    }
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
