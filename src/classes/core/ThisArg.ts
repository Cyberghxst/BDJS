import { InstructionToken } from './Lexer'
import { Return } from './Return'

/**
 * The "this" context of a compiled instruction.
 */
export class InstructionThisArg extends InstructionToken {
    /**
     * Returns a success statement.
     * @returns {Return<ReturnType.Success, unknown>}
     */
    public ok() {
        return Return.success()
    }
}