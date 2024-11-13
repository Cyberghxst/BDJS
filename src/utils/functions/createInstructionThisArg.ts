import { InstructionThisArg, InstructionToken } from '@core/Lexer'
import { Runtime } from '@structures/Runtime'

/**
 * Creates a "this" context for an instruction.
 * @param token - The token of the compiled instruction.
 * @param runtime - The current runtime context.
 * @returns {InstructionThisArg}
 */
export default function(token: InstructionToken, runtime: Runtime) {
    return new InstructionThisArg(token, runtime)
}