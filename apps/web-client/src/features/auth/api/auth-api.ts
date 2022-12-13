import { AUTH_BASE_URL } from "@/constants";
import axios from "axios";

const authApi = axios.create({
	baseURL: AUTH_BASE_URL,
	headers: {
		"Content-Type": "application/json",
	},
});

export default authApi;
