import { InstructionThisArg, InstructionToken } from '../../classes/core/Lexer';
import { Runtime } from '../../classes/structures/Runtime';
/**
 * Creates a "this" context for an instruction.
 * @param token - The token of the compiled instruction.
 * @param runtime - The current runtime context.
 * @returns {InstructionThisArg}
 */
export default function (token: InstructionToken, runtime: Runtime): InstructionThisArg;
