"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var kw_constants_1 = require("kw-constants");
var transport_types_1 = __importDefault(require("../transport-types"));
var transportsConfig = [
    {
        type: transport_types_1["default"].CONSOLE,
        options: {}
    },
    {
        type: transport_types_1["default"].FILE,
        options: {
            filename: "all-%DATE%.log",
            dirname: "./.logs",
            level: "all",
            datePattern: kw_constants_1.DATE_FORMAT
        }
    },
    {
        type: transport_types_1["default"].FILE,
        options: {
            filename: "error-%DATE%.log",
            dirname: "./.logs",
            level: "error",
            datePattern: kw_constants_1.DATE_FORMAT
        }
    },
];
exports["default"] = transportsConfig;
//# sourceMappingURL=index.js.map