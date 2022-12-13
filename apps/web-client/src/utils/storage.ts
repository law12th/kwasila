const storagePrefix = "web-client_";

const storage = {
	getToken: () =>
		JSON.parse(
			window.localStorage.getItem(`${storagePrefix}token`) as string
		),
	setToken: (token: string) => {
		window.localStorage.setItem(
			`${storagePrefix}token`,
			JSON.stringify(token)
		);
	},
	removeToken: () => {
		window.localStorage.removeItem(`${storagePrefix}token`);
	},
};

export default storage;
