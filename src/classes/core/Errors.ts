import { InstructionToken } from './Lexer'
import color from 'cli-color'

/**
* Makes the error string.
* @param token - The token to be used as reference.
* @returns {string}
*/
function makeErrorString(token: InstructionToken, message: string) {
   const result = [
       color.bold(color.red(message)),
       `|--> ${color.italic(color.bold(color.red('at:')))} ${color.bold(color.red(token.toString()))}`,
       `|--> ${color.red(`${' '.repeat(3)} ${'^'.repeat(token.toString().length)}`)}`,
       `|--> ${color.italic(color.bold(color.red(`at line${token.lines.length > 1 ? 's' : ''}:`)))} ${color.bold(color.red(token.lines.join(' - ')))}`,
       `|--> ${color.italic(color.bold(color.red('at bounds:')))} ${color.bold(color.red(token.bounds.join(':')))}`
   ]

   if (token.path.length > 0) {
       let stringPath = token.toString()
       const paths = token.path.reverse()
       paths.forEach(p => stringPath = `${p}[...;${stringPath}]`)

       result.push(`|--> ${color.italic(color.bold(color.red('at path:')))} ${color.bold(color.red(stringPath))}`)
   }

   return result.join('\n')
}

/**
 * Represents an instruction execution error.
 */
export class ExecutionError extends Error {
    /**
     * The name of this error.
     */
    public override name = 'ExecutionError'

    /**
     * Creates a new instance of the `ExecutionError` class.
     * @param token - The token to be used as reference.
     * @param message - The error message.
     * @returns {InvalidInstructionError}
     */
    constructor(token: InstructionToken, message: string) {
        super(makeErrorString(token, message))
    }
}

/**
 * Must be used when an invalid instruction is found.
 */
export class InvalidInstructionError extends Error {
    /**
     * The name of this error.
     */
    public override name = 'InvalidInstructionError'

    /**
     * Creates a new instance of the `InvalidInstructionError` class.
     * @param token - The token to be used as reference.
     * @returns {InvalidInstructionError}
     */
    constructor(token: InstructionToken) {
        super(makeErrorString(token, `"${token.prefix + token.name}" is not a function.`))
    }
}