export function getUserInfo(config) {
	fetch('https://mesto.nomoreparties.co/v1/plus-cohort-13/users/me', {
		headers: {
			authorization: '8412aadf-3d20-4816-8ed7-02669b62ac0d'
		}
	})
	.then(res => {
		if (res.ok) {
			return res.json();
		}
		return Promise.reject(`Ошибка: ${res.status}. Пользователь не найден`);
	})
	.then((data) => {
		config.userName.textContent = data.name;
		config.userStatus.textContent = data.about;
		config.userImage.src = data.avatar;
	})
	.catch(err => console.error(err));
}