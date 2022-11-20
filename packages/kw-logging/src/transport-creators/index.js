"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.createFileTransport = exports.createConsoleTransport = void 0;
var winston_daily_rotate_file_1 = __importDefault(require("winston-daily-rotate-file"));
var transports_1 = require("winston/lib/winston/transports");
var createConsoleTransport = function (options) {
    return new transports_1.Console(options);
};
exports.createConsoleTransport = createConsoleTransport;
var createFileTransport = function (options) {
    return new winston_daily_rotate_file_1["default"](options);
};
exports.createFileTransport = createFileTransport;
//# sourceMappingURL=index.js.map