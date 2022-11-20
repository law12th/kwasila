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
	}
}
