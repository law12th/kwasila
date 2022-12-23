import { DailyRotateFileTransportOptions } from "winston-daily-rotate-file";
import { ConsoleTransportOptions } from "winston/lib/winston/transports";
import TransportTypes from "../transport-types";

interface ConsoleTransport {
	type: TransportTypes;
	options: ConsoleTransportOptions;
}

interface FileTransport {
	type: TransportTypes;
	options: DailyRotateFileTransportOptions;
}

export type Transport = ConsoleTransport | FileTransport;
