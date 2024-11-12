"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InstructionThisArg = void 0;
const Lexer_1 = require("./Lexer");
const Return_1 = require("./Return");
/**
 * The "this" context of a compiled instruction.
 */
class InstructionThisArg extends Lexer_1.InstructionToken {
    /**
     * Creates a new instance of the `InstructionThisArg` class.
     * @param token - The token to be inherited.
     * @param runtime - The current runtime context.
     * @returns {InstructionThisArg}
     */
    constructor(token, runtime) {
        super(token.bounds, token.lines);
        this.runtime = runtime;
        Object.assign(this, token);
    }
    /**
     * Returns a success statement.
     * @returns {Return<ReturnType.Success, unknown>}
     */
    ok() {
        return Return_1.Return.success();
    }
}
exports.InstructionThisArg = InstructionThisArg;
