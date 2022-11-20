/* eslint-disable no-restricted-syntax */
/* eslint-disable turbo/no-undeclared-env-vars */
/* eslint-disable import/no-extraneous-dependencies */
import path from "path";
import dotenv from "dotenv";

dotenv.config({ path: path.resolve(__dirname, "../../.env") });

interface ENV {
	NODE_ENV: string | undefined;
	PORT: number | undefined;
	DB_USER: string | undefined;
	DB_HOST: string | undefined;
	DB_NAME: string | undefined;
	DB_PASSWORD: string | undefined;
	DB_PORT: number | undefined;
}

interface Config {
	NODE_ENV: string;
	PORT: number;
	DB_USER: string;
	DB_HOST: string;
	DB_NAME: string;
	DB_PASSWORD: string;
	DB_PORT: number;
}

const getConfig = (): ENV => ({
	NODE_ENV: process.env.NODE_ENV,
	PORT: process.env.PORT,
	DB_USER: process.env.DB_USER,
	DB_HOST: process.env.DB_HOST,
	DB_NAME: process.env.DB_NAME,
	DB_PASSWORD: process.env.DB_PASSWORD,
	DB_PORT: process.env.DB_PORT,
});

const getSanitizedConfig = (config: ENV): Config => {
	for (const [key, value] of Object.entries(config)) {
		if (value === undefined) {
			throw new Error(`missing key ${key} in .env file`);
		}
	}
	return config as Config;
};

const config = getSanitizedConfig(getConfig());

export default config;
