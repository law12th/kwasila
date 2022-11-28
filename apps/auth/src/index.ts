import http from "http";
import { LoggerFactory } from "kw-logging";
import app from "./app";
import { config } from "./config";
import initializeSeeds from "./services/seeds";

const logger = LoggerFactory.getLogger();

const start = async () => {
	await initializeSeeds();

	const server = http.createServer(app);

	server
		.listen(config.PORT, () => {
			logger.info(`auth listening on port ${config.PORT}`);
		})
		.on("error", (err) => {
			logger.error(`auth failed to listen: ${err}`);
		});
};

start();
