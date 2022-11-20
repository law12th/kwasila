import DailyRotateFile, {
	DailyRotateFileTransportOptions,
} from "winston-daily-rotate-file";
import {
	Console,
	ConsoleTransportOptions,
} from "winston/lib/winston/transports";

export const createConsoleTransport = (options: ConsoleTransportOptions) =>
	new Console(options);

export const createFileTransport = (options: DailyRotateFileTransportOptions) =>
	new DailyRotateFile(options);
