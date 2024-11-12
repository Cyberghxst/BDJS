"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = default_1;
const ThisArg_1 = require("../../classes/core/ThisArg");
/**
 * Creates a "this" context for an instruction.
 * @param token - The token of the compiled instruction.
 * @param runtime - The current runtime context.
 * @returns {InstructionThisArg}
 */
function default_1(token, runtime) {
    return new ThisArg_1.InstructionThisArg(token, runtime);
}
