import { DailyRotateFileTransportOptions } from "winston-daily-rotate-file";
import { ConsoleTransportOptions } from "winston/lib/winston/transports";
import TransportTypes from "../transport-types";
interface ConsoleTransport {
    type: TransportTypes.CONSOLE;
    options: ConsoleTransportOptions;
}
interface FileTransport {
    type: TransportTypes.FILE;
    options: DailyRotateFileTransportOptions;
}
export type Transport = ConsoleTransport | FileTransport;
export {};
//# sourceMappingURL=index.d.ts.map