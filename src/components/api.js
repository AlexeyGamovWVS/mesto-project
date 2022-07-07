const key = {
  serverAdress: "https://mesto.nomoreparties.co/v1/plus-cohort-13/",
  userAdress: "https://mesto.nomoreparties.co/v1/plus-cohort-13/users/me",
  cardsAdress: "https://mesto.nomoreparties.co/v1/plus-cohort-13/cards",
  headers: {
    headers: {
      authorization: "8412aadf-3d20-4816-8ed7-02669b62ac0d",
    },
  },
};

export function getUserInfo(config) {
  fetch(key.userAdress, key.headers)
    .then((res) => getResponse(res))
    .then((data) => {
      config.userName.textContent = data.name;
      config.userStatus.textContent = data.about;
      config.userImage.src = data.avatar;
    })
    .catch((err) => console.error(err));
}

export function getInitialCards() {
  return fetch(key.cardsAdress, key.headers).then((res) => getResponse(res));
}

export function sendPost(name, link) {
  return fetch(key.cardsAdress, {
    method: "POST",
    headers: {
      authorization: "8412aadf-3d20-4816-8ed7-02669b62ac0d",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: name,
      link: link,
    }),
  }).then((res) => getResponse(res));
}

export function sendUserData(userName, userAbout) {
  return fetch(key.userAdress, {
    method: "PATCH",
    headers: {
      authorization: "8412aadf-3d20-4816-8ed7-02669b62ac0d",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: userName,
      about: userAbout,
    }),
  }).then((res) => getResponse(res));
}

function getResponse(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}. Данные не были найдены`);
}
