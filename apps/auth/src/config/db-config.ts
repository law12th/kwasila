import { LoggerFactory } from "kw-logging";
import "reflect-metadata";
import { DataSource } from "typeorm";
import { Customer, Patch, Vendor } from "../entities";
import runSeeds from "../services/seeds";
import config from "./env-config";

const logger = LoggerFactory.getLogger();

const dataSource = new DataSource({
	type: "postgres",
	host: config.DB_HOST,
	port: config.DB_PORT,
	username: config.DB_USER,
	password: config.DB_PASSWORD,
	database: config.DB_NAME,
	entities: [Customer, Vendor, Patch],
	migrations: ["../migrations/**/*.ts"],
});

(async () => {
	try {
		await dataSource.initialize();
		await runSeeds(dataSource);
	} catch (err) {
		logger.error(`database connection failed: ${err}`);
	}
})();

export default dataSource;
