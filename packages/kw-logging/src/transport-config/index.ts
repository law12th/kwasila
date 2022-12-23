import { DATE_FORMAT } from "kw-constants";
import { Transport } from "../transports";

const transportsConfig: Transport[] = [
	{
		type: "CONSOLE",
		options: {},
	},
	{
		type: "FILE",
		options: {
			filename: "all-%DATE%.log",
			dirname: "./.logs",
			level: "all",
			datePattern: DATE_FORMAT,
		},
	},
	{
		type: "FILE",
		options: {
			filename: "error-%DATE%.log",
			dirname: "./.logs",
			level: "error",
			datePattern: DATE_FORMAT,
		},
	},
];

export default transportsConfig;
