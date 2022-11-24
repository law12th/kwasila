export interface LoginCredentials {
	vendor_name: string;
	email: string;
	password: string;
}

export interface RegistrationCredentials {
	vendor_name: string;
	email: string;
	address: string;
	phone_1: string;
	phone_2?: string;
	password: string;
}
