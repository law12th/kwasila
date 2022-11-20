"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var morgan_1 = __importDefault(require("morgan"));
var logger_factory_1 = __importDefault(require("./logger-factory"));
var logger = logger_factory_1["default"].getLogger();
var messageFormat = ":method :url :status :res[content-length] - :response-time ms";
var stream = {
    write: function (message) { return logger.http(message); }
};
var morganMiddleware = (0, morgan_1["default"])(messageFormat, { stream: stream });
exports["default"] = morganMiddleware;
//# sourceMappingURL=morgan-middleware.js.map