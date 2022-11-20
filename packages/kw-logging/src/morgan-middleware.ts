import morgan, { StreamOptions } from "morgan";
import LoggerFactory from "./logger-factory";

const logger = LoggerFactory.getLogger();

const messageFormat =
	":method :url :status :res[content-length] - :response-time ms";

const stream: StreamOptions = {
	write: (message) => logger.http(message),
};

const morganMiddleware = morgan(messageFormat, { stream });

export default morganMiddleware;
