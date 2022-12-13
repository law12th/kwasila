import { UserResponse } from "../types";
import authApi from "./auth-api";

export type RegisterCredentialsDTO = {
	vendor_name: string;
	email: string;
	address: string;
	phone_1: string;
	phone_2?: string;
	password: string;
};

export const register = async (
	credentials: RegisterCredentialsDTO
): Promise<UserResponse> => {
	const response = await authApi.post("/vendor/registration", credentials);
	return response.data;
};
