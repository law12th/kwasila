const TRANSPORT_TYPES = {
	CONSOLE: "CONSOLE",
	FILE: "FILE",
} as const;

type TransportTypes = typeof TRANSPORT_TYPES[keyof typeof TRANSPORT_TYPES];

export default TransportTypes;
