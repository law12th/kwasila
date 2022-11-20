/* eslint-disable consistent-return */
import {
	createConsoleTransport,
	createFileTransport,
} from "../transport-creators";
import TransportTypes from "../transport-types";
import { Transport } from "../transports";

const getLoggerTransports = (transportsConfig: Transport[]) =>
	transportsConfig.forEach(({ type, options }) => {
		switch (type) {
			case TransportTypes.CONSOLE:
				return createConsoleTransport(options);
			case TransportTypes.FILE:
				return createFileTransport(options);
			default:
		}
	});

export default getLoggerTransports;
