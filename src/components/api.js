export function getUserInfo() {
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
	.then(res => console.log(res))
	.catch(err => console.error(err));
}