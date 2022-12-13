export type AuthUser = {
	id: string;
	email: string;
	vendor_name: string;
};

export type UserResponse = {
	jwt: string;
	user: AuthUser;
};
