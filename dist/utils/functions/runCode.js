"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const createRuntime_1 = __importDefault(require("./createRuntime"));
const node_vm_1 = require("node:vm");
/**
 * Runs BDJS code into a safe sandbox.
 * @param code - Code to be executed.
 * @param runtime - Runtime data.
 * @returns {any}
 */
function runCode(code, runtime) {
    return (0, node_vm_1.runInContext)(code, (0, createRuntime_1.default)(runtime));
}
exports.default = runCode;
