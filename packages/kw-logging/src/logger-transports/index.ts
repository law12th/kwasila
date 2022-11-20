/* eslint-disable array-callback-return */
/* eslint-disable default-case */
/* eslint-disable consistent-return */
/* eslint-disable arrow-body-style */
import {
	createConsoleTransport,
	createFileTransport,
} from "../transport-creators";
import TransportTypes from "../transport-types";
import { Transport } from "../transports";

const getLoggerTransports = (transportsConfig: Transport[]) => {
	return transportsConfig.map(({ type, options }) => {
		switch (type) {
			case TransportTypes.CONSOLE:
				return createConsoleTransport(options);
			case TransportTypes.FILE:
				return createFileTransport(options);
		}
	});
};

export default getLoggerTransports;
