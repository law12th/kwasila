import { LoggerFactory } from "kw-logging";
import { Pool } from "pg";
import config from "./env-config";

const logger = LoggerFactory.getLogger();

const pool = new Pool({
	host: config.DB_HOST,
	user: config.DB_USER,
	database: config.DB_NAME,
	password: config.DB_PASSWORD,
	port: config.DB_PORT,
});

const connectToDB = async () => {
	try {
		await pool.connect();
		logger.info("database connection successfully established");
	} catch (err) {
		logger.error(`database failed to connect: ${err}`);
	}
};

export default connectToDB;
