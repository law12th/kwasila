import { Transport } from "../transports";
declare const getLoggerTransports: (transportsConfig: Transport[]) => (import("winston-daily-rotate-file") | import("winston/lib/winston/transports").ConsoleTransportInstance)[];
export default getLoggerTransports;
//# sourceMappingURL=index.d.ts.map