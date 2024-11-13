import { InstructionToken } from './Lexer';
/**
 * Represents an instruction execution error.
 */
export declare class ExecutionError extends Error {
    /**
     * The name of this error.
     */
    name: string;
    /**
     * Creates a new instance of the `ExecutionError` class.
     * @param token - The token to be used as reference.
     * @param message - The error message.
     * @returns {InvalidInstructionError}
     */
    constructor(token: InstructionToken, message: string);
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
}
