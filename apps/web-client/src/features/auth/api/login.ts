import { UserResponse } from "../types";
import authApi from "./auth-api";

export type LoginCredentialsDTO = {
	vendor_name: string;
	email: string;
	password: string;
};

export const login = async (
	credentials: LoginCredentialsDTO
): Promise<UserResponse> => {
	const response = await authApi.post("vendor/login", credentials);
	return response.data;
};
