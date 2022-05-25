// ====== DOM Elements for changing ======
const profileName = document.querySelector('.profile__name');
const profileStatus = document.querySelector('.profile__status');
const posts = document.querySelector('.posts__container');
const postTemplate = document.querySelector('#post').content;

// ====== pop-ups ======
const editPop = document.querySelector('#edit-profile-popup');
const addPop = document.querySelector('#post-add-popup');
const imgPop = document.querySelector('#post-popup');

// ====== pop-up constants ======
const imgPopItem = imgPop.querySelector('.popup__img-item');
const imgPopCaption = imgPop.querySelector('.popup__img-caption');

// ====== forms & inputs ======
const profileForm = document.querySelector('#profile-edit-form');
const addPostIntoStartForm = document.querySelector('#add-post-form');

const inputName = profileForm.querySelector('#author');
const inputDescr = profileForm.querySelector('#status');
const inputPlace = addPostIntoStartForm.querySelector('#place');
const inputLink = addPostIntoStartForm.querySelector('#img-link');

// ====== buttons ======
const editProfileBtn = document.querySelector('#edit-profile');
const postAddButton = document.querySelector('#add-btn');
const closeButtons = document.querySelectorAll('.popup__btn-close');

// ====== Initial Cards ======
const initialCards = [
  {
    name: 'Карачаевск',
    link: './images/karachaevsk.jpeg'
  },
  {
    name: 'Гора Эльбрус',
    link: './images/elbrus.jpeg'
  },
  {
    name: 'Домбай',
    link: './images/domaby.jpeg'
  },
  {
    name: 'Маттерхорн',
    link: './images/mattern.jpeg'
  },
  {
    name: 'Серро-Торре',
    link: './images/serro.jpeg'
  },
  {
    name: 'Тре-Чиме-ди-Лаваред',
    link: './images/rechime.jpeg'
  },
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

// ====== buttons processing ======
const openPopup = pop => pop.classList.add('popup_opened');
const closePopup = pop => pop.classList.remove('popup_opened');

editProfileBtn.addEventListener('click', () => openPopup(editPop));
postAddButton.addEventListener('click', () => openPopup(addPop));

closeButtons.forEach((button) => {
  const popup = button.closest('.popup');
  button.addEventListener('click', () => closePopup(popup));
});

// ====== Profile Processing ======
inputName.value = profileName.textContent;
inputDescr.value = profileStatus.textContent;

const changeProfile = () => {
  profileName.textContent = inputName.value;
  profileStatus.textContent = inputDescr.value;
};

profileForm.addEventListener('submit', evt => {
  evt.preventDefault();
  changeProfile();
  closePopup(editPop);
});

// ====== Post Creation ======
function createPost(place, link) {
  const postElement = postTemplate.querySelector('.post').cloneNode(true);
  const postImage = postElement.querySelector('.post__img');
  const postName = postElement.querySelector('.post__name');

  postName.textContent = place;
  postImage.src = link;
  postImage.setAttribute('alt', place);

  // post's buttons processing start
  postElement.querySelector('.post__btn-like').addEventListener('click', evt => evt.target.classList.toggle('post__btn-like_active'));
  postElement.querySelector('.post__delete').addEventListener('click', () => postElement.remove());

  postImage.addEventListener('click', () => {
    imgPopItem.src = link;
    imgPopItem.setAttribute('alt', place);
    imgPopCaption.textContent = place;
    openPopup(imgPop);
  });
  // post's buttons processing end
  return postElement;
};

const addPostIntoStart = (place, link) => {
  posts.prepend(createPost(place, link));
};

// ====== Post Form Processing ======
addPostIntoStartForm.addEventListener('submit', evt => {
  evt.preventDefault();
  addPostIntoStart(inputPlace.value, inputLink.value);
  evt.target.reset();
  closePopup(addPop);
});

// ====== Initialize Posts =======
function renderInitialCards() {
  initialCards.forEach(item => addPostIntoStart(item.name, item.link));
};

renderInitialCards();

// Себе на память...
  // Небезопасное добавление постов
    // posts.insertAdjacentHTML('afterbegin', `
    //   <li class="post">
    //     <img
    //       src="${inLink}"
    //       class="post__img"
    //     />
    //     <div class="post__description-row">
    //       <h3 class="post__name">${inPlace}</h3>
    //       <button type="button" class="post__btn-like"></button>
    //     </div>
    //   </li>
    // `);
  //
//