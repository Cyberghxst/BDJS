"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReturnType = exports.BaseInstruction = void 0;
const akore_1 = require("akore");
class BaseInstruction extends akore_1.BaseCompetence {
}
exports.BaseInstruction = BaseInstruction;
/**
 * Represents the return type of a value.
 */
var ReturnType;
(function (ReturnType) {
    ReturnType[ReturnType["Array"] = 0] = "Array";
    ReturnType[ReturnType["Bigint"] = 1] = "Bigint";
    ReturnType[ReturnType["Boolean"] = 2] = "Boolean";
    ReturnType[ReturnType["Number"] = 3] = "Number";
    ReturnType[ReturnType["Object"] = 4] = "Object";
    ReturnType[ReturnType["String"] = 5] = "String";
    ReturnType[ReturnType["Unknown"] = 6] = "Unknown";
})(ReturnType || (exports.ReturnType = ReturnType = {}));
