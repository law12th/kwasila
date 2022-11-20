import { Colours, DATE_FORMAT, LoggingLevels, TIME_FORMAT } from "kw-constants";
import * as winston from "winston";
import getLoggerTransports from "./logger-transports";
import { Transport } from "./transports";

const colours = {
	error: Colours.RED,
	warn: Colours.YELLOW,
	info: Colours.BLUE,
	http: Colours.MAGENTA,
	debug: Colours.WHITE,
};

winston.addColors(colours);

const levels = {
	error: LoggingLevels.ERROR,
	warn: LoggingLevels.WARN,
	info: LoggingLevels.INFO,
	http: LoggingLevels.HTTP,
	debug: LoggingLevels.DEBUG,
};

const format = winston.format.combine(
	winston.format.timestamp({ format: `${DATE_FORMAT} ${TIME_FORMAT}` }),
	winston.format.colorize({ all: true }),
	winston.format.printf(
		(info) => `${info.timestamp} ${info.level}: ${info.message}`
	)
);

const createLogger = (transportsConfig: Transport[]): winston.Logger => winston.createLogger({
		transports: getLoggerTransports(transportsConfig),
		levels,
		format,
	});

export default createLogger;
