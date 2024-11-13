"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = default_1;
const Lexer_1 = require("../../classes/core/Lexer");
/**
 * Creates a "this" context for an instruction.
 * @param token - The token of the compiled instruction.
 * @param runtime - The current runtime context.
 * @returns {InstructionThisArg}
 */
function default_1(token, runtime) {
    return new Lexer_1.InstructionThisArg(token, runtime);
}
