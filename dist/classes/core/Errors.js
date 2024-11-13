"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InvalidInstructionError = exports.ExecutionError = void 0;
const cli_color_1 = __importDefault(require("cli-color"));
/**
* Makes the error string.
* @param token - The token to be used as reference.
* @returns {string}
*/
function makeErrorString(token, message) {
    const result = [
        cli_color_1.default.bold(cli_color_1.default.red(message)),
        `|--> ${cli_color_1.default.italic(cli_color_1.default.bold(cli_color_1.default.red('at:')))} ${cli_color_1.default.bold(cli_color_1.default.red(token.toString()))}`,
        `|--> ${cli_color_1.default.red(`${' '.repeat(3)} ${'^'.repeat(token.toString().length)}`)}`,
        `|--> ${cli_color_1.default.italic(cli_color_1.default.bold(cli_color_1.default.red(`at line${token.lines.length > 1 ? 's' : ''}:`)))} ${cli_color_1.default.bold(cli_color_1.default.red(token.lines.join(' - ')))}`,
        `|--> ${cli_color_1.default.italic(cli_color_1.default.bold(cli_color_1.default.red('at bounds:')))} ${cli_color_1.default.bold(cli_color_1.default.red(token.bounds.join(':')))}`
    ];
    if (token.path.length > 0) {
        let stringPath = token.toString();
        const paths = token.path.reverse();
        paths.forEach(p => stringPath = `${p}[...;${stringPath}]`);
        result.push(`|--> ${cli_color_1.default.italic(cli_color_1.default.bold(cli_color_1.default.red('at path:')))} ${cli_color_1.default.bold(cli_color_1.default.red(stringPath))}`);
    }
    return result.join('\n');
}
/**
 * Represents an instruction execution error.
 */
class ExecutionError extends Error {
    /**
     * The name of this error.
     */
    name = 'ExecutionError';
    /**
     * Creates a new instance of the `ExecutionError` class.
     * @param token - The token to be used as reference.
     * @param message - The error message.
     * @returns {InvalidInstructionError}
     */
    constructor(token, message) {
        super(makeErrorString(token, message));
    }
}
exports.ExecutionError = ExecutionError;
/**
 * Must be used when an invalid instruction is found.
 */
class InvalidInstructionError extends Error {
    /**
     * The name of this error.
     */
    name = 'InvalidInstructionError';
    /**
     * Creates a new instance of the `InvalidInstructionError` class.
     * @param token - The token to be used as reference.
     * @returns {InvalidInstructionError}
     */
    constructor(token) {
        super(makeErrorString(token, `"${token.prefix + token.name}" is not a function.`));
    }
}
exports.InvalidInstructionError = InvalidInstructionError;
