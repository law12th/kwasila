import DailyRotateFile, { DailyRotateFileTransportOptions } from "winston-daily-rotate-file";
import { ConsoleTransportOptions } from "winston/lib/winston/transports";
export declare const createConsoleTransport: (options: ConsoleTransportOptions) => import("winston/lib/winston/transports").ConsoleTransportInstance;
export declare const createFileTransport: (options: DailyRotateFileTransportOptions) => DailyRotateFile;
//# sourceMappingURL=index.d.ts.map