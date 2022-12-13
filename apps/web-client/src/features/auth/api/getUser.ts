import { AuthUser } from "../types";
import authApi from "./auth-api";

const getUser = async (): Promise<AuthUser> => {
	const response = await authApi.get("/vendor");
	return response.data;
};

export default getUser;
