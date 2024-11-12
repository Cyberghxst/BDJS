import type { Runtime } from '../structures/Runtime';
import { InstructionToken } from './Lexer';
import { Return } from './Return';
/**
 * The "this" context of a compiled instruction.
 */
export declare class InstructionThisArg extends InstructionToken {
    private runtime;
    /**
     * Creates a new instance of the `InstructionThisArg` class.
     * @param token - The token to be inherited.
     * @param runtime - The current runtime context.
     * @returns {InstructionThisArg}
     */
    constructor(token: InstructionToken, runtime: Runtime);
    /**
     * Returns a success statement.
     * @returns {Return<ReturnType.Success, unknown>}
     */
    ok(): Return<import("./Return").ReturnType.Success, unknown>;
}
