"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var logger_1 = __importDefault(require("./logger"));
var transport_config_1 = __importDefault(require("./transport-config"));
var LoggerFactory = /** @class */ (function () {
    function LoggerFactory() {
    }
    LoggerFactory.getLogger = function () {
        if (!LoggerFactory.logger) {
            LoggerFactory.logger = (0, logger_1["default"])(transport_config_1["default"]);
        }
        return LoggerFactory.logger;
    };
    return LoggerFactory;
}());
exports["default"] = LoggerFactory;
//# sourceMappingURL=logger-factory.js.map