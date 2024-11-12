import { InstructionToken } from './Lexer';
/**
 * Represents an instruction execution error.
 */
export declare class ExecutionError extends Error {
}
/**
 * Must be used when an invalid instruction is found.
 */
export declare class InvalidInstructionError extends Error {
    /**
     * The name of this error.
     */
    name: string;
    /**
     * Creates a new instance of the `InvalidInstructionError` class.
     * @param token - The token to be used as reference.
     * @returns {InvalidInstructionError}
     */
    constructor(token: InstructionToken);
    /**
     * Makes the error string.
     * @param token - The token to be used as reference.
     * @returns {string}
     */
    static makeErrorString(token: InstructionToken): string;
}
