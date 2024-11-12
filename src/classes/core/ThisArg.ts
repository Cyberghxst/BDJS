import type { Runtime } from '@structures/Runtime'
import { InstructionToken } from './Lexer'
import { Return } from './Return'

/**
 * The "this" context of a compiled instruction.
 */
export class InstructionThisArg extends InstructionToken {
    /**
     * Creates a new instance of the `InstructionThisArg` class.
     * @param token - The token to be inherited.
     * @param runtime - The current runtime context.
     * @returns {InstructionThisArg}
     */
    constructor(token: InstructionToken, private runtime: Runtime) {
        super(token.bounds, token.lines)
        Object.assign(this, token)
    }

    /**
     * Returns a success statement.
     * @returns {Return<ReturnType.Success, unknown>}
     */
    public ok() {
        return Return.success()
    }
}