import {
	AuthUser,
	getUser,
	login,
	LoginCredentialsDTO,
	register,
	RegisterCredentialsDTO,
	UserResponse,
} from "@/features/auth";
import storage from "@/utils/storage";
import { initReactQueryAuth } from "react-query-auth";

const handleUserResponse = async (response: UserResponse) => {
	const { jwt, user } = response;
	storage.setToken(jwt);

	return user;
};

const loadUser = async () => {
	if (!storage.getToken()) {
		return null;
	}
	const data = await getUser();

	return data;
};

const loginFn = async (credentials: LoginCredentialsDTO) => {
	const response = await login(credentials);

	const user = await handleUserResponse(response);

	return user;
};

const registerFn = async (credentials: RegisterCredentialsDTO) => {
	const response = await register(credentials);

	const user = await handleUserResponse(response);

	return user;
};

const logoutFn = async () => {
	storage.removeToken();

	window.location.assign(window.location.origin as unknown as string);
};

const authConfig = {
	loadUser,
	loginFn,
	registerFn,
	logoutFn,
	LoaderComponent: () => {
		return <div>Loading...</div>;
	},
};

export const { AuthProvider, useAuth } = initReactQueryAuth<
	AuthUser | null,
	unknown,
	LoginCredentialsDTO,
	RegisterCredentialsDTO
>(authConfig);
