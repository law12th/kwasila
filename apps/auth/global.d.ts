/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
namespace NodeJS {
	interface ProcessEnv {
		NODE_ENV: string;
		PORT: number;
		DB_USER: string;
		DB_HOST: string;
		DB_NAME: string;
		DB_PASSWORD: string;
		DB_PORT: number;
		GOOGLE_CLIENT_iD: string;
		GOOGLE_CLIENT_SECRET: string;
		GOOGLE_OAUTH_CALLBACK_URL: string;
		JWT_SECRET: string;
	}
}
