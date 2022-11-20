"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var kw_constants_1 = require("kw-constants");
var winston = __importStar(require("winston"));
var logger_transports_1 = __importDefault(require("./logger-transports"));
var colours = {
    error: kw_constants_1.Colours.RED,
    warn: kw_constants_1.Colours.YELLOW,
    info: kw_constants_1.Colours.BLUE,
    http: kw_constants_1.Colours.MAGENTA,
    debug: kw_constants_1.Colours.WHITE
};
winston.addColors(colours);
var levels = {
    error: kw_constants_1.LoggingLevels.ERROR,
    warn: kw_constants_1.LoggingLevels.WARN,
    info: kw_constants_1.LoggingLevels.INFO,
    http: kw_constants_1.LoggingLevels.HTTP,
    debug: kw_constants_1.LoggingLevels.DEBUG
};
var format = winston.format.combine(winston.format.timestamp({ format: "".concat(kw_constants_1.DATE_FORMAT, " ").concat(kw_constants_1.TIME_FORMAT) }), winston.format.colorize({ all: true }), winston.format.printf(function (info) { return "".concat(info.timestamp, " ").concat(info.level, ": ").concat(info.message); }));
var createLogger = function (transportsConfig) { return winston.createLogger({
    transports: (0, logger_transports_1["default"])(transportsConfig),
    levels: levels,
    format: format
}); };
exports["default"] = createLogger;
//# sourceMappingURL=logger.js.map