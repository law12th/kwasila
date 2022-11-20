"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
/* eslint-disable array-callback-return */
/* eslint-disable default-case */
/* eslint-disable consistent-return */
/* eslint-disable arrow-body-style */
var transport_creators_1 = require("../transport-creators");
var transport_types_1 = __importDefault(require("../transport-types"));
var getLoggerTransports = function (transportsConfig) {
    return transportsConfig.map(function (_a) {
        var type = _a.type, options = _a.options;
        switch (type) {
            case transport_types_1["default"].CONSOLE:
                return (0, transport_creators_1.createConsoleTransport)(options);
            case transport_types_1["default"].FILE:
                return (0, transport_creators_1.createFileTransport)(options);
        }
    });
};
exports["default"] = getLoggerTransports;
//# sourceMappingURL=index.js.map