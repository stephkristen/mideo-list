const API_URL = 'http://localhost:8080';

function makeUser(token) {
	const splitToken = token.split('.');
	const payload = splitToken[1];
	const jsonString = atob(payload);
	const user = JSON.parse(jsonString);

	return user;
}

export async function authenticate(user) {
	const init = {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(user),
	};

	const response = await fetch(`${API_URL}/authenticate`, init);
	if (response.ok) {
		const info = await response.json();
		const token = info.jwt_token;
		
        localStorage.setItem('jwt', token);
		const user = makeUser(token);

		return Promise.resolve(user);
	} else {
		return Promise.reject();
	}
}

export async function createAccount(newUser) {
	const init = {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(newUser),
	};

	const response = await fetch(`${API_URL}/create_account`, init);
	if (response.ok) {
		return Promise.resolve();
	}

	const errors = await response.json();
	return Promise.reject(errors);
}

export async function refresh() {
	const init = {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${localStorage.getItem('jwt')}`,
		},
	};
	const response = await fetch(`${API_URL}/refresh_token`, init);
	if (response.ok) {
		const data = await response.json();
		const token = data.jwt_token;
		localStorage.setItem('jwt', token);
		const user = makeUser(token);
		return Promise.resolve(user);
	}

	return Promise.reject();
}