const key = {
  serverAdress: "https://mesto.nomoreparties.co/v1/plus-cohort-13/",
  userAdress: `https://mesto.nomoreparties.co/v1/plus-cohort-13/users/me`,
  cardsAdress: "https://mesto.nomoreparties.co/v1/plus-cohort-13/cards",
  headers: {
    authorization: "8412aadf-3d20-4816-8ed7-02669b62ac0d",
    "Content-Type": "application/json",
  },
};

export function getUserInfo() {
  return fetch(key.userAdress, { headers: key.headers }).then((res) =>
    getResponse(res)
  );
}

export function getInitialCards() {
  return fetch(key.cardsAdress, { headers: key.headers }).then((res) =>
    getResponse(res)
  );
}

export function sendPost(name, link) {
  return fetch(key.cardsAdress, {
    method: "POST",
    headers: key.headers,
    body: JSON.stringify({
      name: name,
      link: link,
    }),
  }).then((res) => getResponse(res));
}

export function deletePost(cardId) {
  return fetch(`${key.cardsAdress}/${cardId}`, {
    method: "DELETE",
    headers: key.headers,
  }).then((res) => getResponse(res));
}

export function sendUserData(userName, userAbout) {
  return fetch(key.userAdress, {
    method: "PATCH",
    headers: key.headers,
    body: JSON.stringify({
      name: userName,
      about: userAbout,
    }),
  }).then((res) => getResponse(res));
}

export function sendLike(cardId) {
  return fetch(`${key.cardsAdress}/likes/${cardId}`, {
    method: "PUT",
    headers: key.headers,
  })
    .then((res) => getResponse(res));
}

export function deleteLike(cardId) {
  return fetch(`${key.cardsAdress}/likes/${cardId}`, {
    method: "DELETE",
    headers: key.headers,
  }).then((res) => getResponse(res));
}

export function sendUserPhoto(imgLink) {
  return fetch(`${key.userAdress}/avatar`, {
    method: "PATCH",
    headers: key.headers,
    body: JSON.stringify({
      avatar: imgLink,
    }),
  }).then((res) => getResponse(res));
}

function getResponse(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}. Данные не были найдены`);
}
