import { Instruction } from '../structures/Instruction';
/**
 * Represents an AST token.
 */
export interface IBaseToken {
    /**
     * The start and end positions this token is in.
     */
    bounds: [number, number];
    /**
     * The lines that this token is on.
     */
    lines: number[];
    /**
     * The string representation of this token.
     */
    toString(): string;
}
/**
 * Represents an instruction field value in the AST.
 */
export interface InstructionFieldValue {
    /**
     * The entire value.
     */
    value: string;
}
/**
 * Represents an instruction in the AST.
 */
export declare class InstructionToken implements IBaseToken {
    /**
     * The bounds the token is in.
     */
    bounds: [number, number];
    /**
     * The lines that this token is on.
     */
    lines: number[];
    /**
     * The name this instruction has.
     */
    name: string;
    /**
     * The prefix this instruction has.
     */
    prefix: string;
    /**
     * The content inside the instruction.
     * Fallbacks to `null` if no content.
     */
    inside: string | null;
    /**
     * The splitted fields inside the instruction.
     * Fallbacks to `null` if no fields.
     */
    fields: InstructionFieldValue[] | null;
    /**
     * Whether this instruction is supressed.
     * @default false
     */
    supressed: boolean;
    /**
     * Whether this instruction is closed.
     * @default false
     */
    closed: boolean;
    /**
     * The ID of this instruction in the AST.
     * @default '#INSTRUCTION_0#'
     */
    id: `#INSTRUCTION_${number}#`;
    /**
     * The path of this instruction.
     * @example
     * '$log[$toLowerCase[$get[name]]]' // ['$log', '$toLowerCase', '$get']
     */
    path: string[];
    /**
     * The parent instruction this child may have.
     * Fallbacks to `null` if no parent.
     */
    parent: InstructionToken | null;
    /**
     * The children instructions this parent may have.
     */
    children: InstructionToken[];
    /**
     * The field this instruction is located in the parent function.
     * Fallbacks to `null` if no parent.
     */
    from: number | null;
    /**
     * Instruction metadata pulled from the instruction manager.
     * Fallbacks to `null` if no data found.
     */
    data: Instruction | null;
    /**
     * Creates a new instance of the `InstructionToken` class.
     * @param bounds - The bounds the token is in.
     * @param lines - The lines that this token is on.
     */
    constructor(bounds?: [number, number], lines?: number[]);
    /**
     * Check whether this token has instruction metadata pulled.
     * @returns {this is this & { data: Instruction }}
     */
    hasData(): this is this & {
        data: Instruction;
    };
    /**
     * Check whether this instruction is fieldless.
     * @returns {this is this & { inside: null, fields: null }}
     */
    isFieldless(): this is this & {
        inside: null;
        fields: null;
    };
    /**
     * Pulls instruction metadata from the instruction manager.
     * @returns {void}
     */
    pullMetadata(): void;
    /**
     * Whether mark this instruction as closed.
     * @param state - Closure state.
     * @returns {void}
     */
    setClosed(state?: boolean): void;
    /**
     * Marks this instruction as fieldless.
     * @returns {void}
     */
    setFieldless(): void;
    /**
     * Whether mark this instruction as suppresed.
     * @param state - Suppression state.
     * @returns {void}
     */
    setSupressed(state?: boolean): void;
    /**
     * Returns the string representation of this token.
     * @returns {string}
     */
    toString(): string;
}
/**
 * The main instruction of a BDJS code.
 */
export declare const mainInstruction = "$BDJSEXECUTEDATA";
/**
 * The setup options of the lexer.
 */
export interface ILexerOptions {
    /**
     * Whether add the main instruction to the input code.
     */
    addMainInstruction: boolean;
    /**
     * Inherits compiled instructions count from a parent lexer.
     */
    count: number;
    /**
     * Inherits compiled instructions path from a parent lexer.
     */
    path: string[];
}
/**
 * This class creates an abstract syntax tree from code.
 */
export declare class Lexer {
    #private;
    /**
     * The lexer setup options.
     */
    private options;
    /**
     * Creates a new instance of the `Lexer` class.
     * @param code - The code to be analyzed.
     * @param options - Lexer setup options.
     */
    constructor(code: string, options?: Partial<ILexerOptions>);
    /**
     * Set the input code for the analysis.
     * @param code - The input code.
     * @returns {void}
     */
    setInput(code: string): void;
    /**
     * Tokenizes the input code to an AST.
     * @returns {InstructionToken<boolean>[]}
     */
    toAST(): InstructionToken[];
    /**
     * Returns the current line the cursor is on.
     * @returns {number}
     */
    get line(): number;
    /**
     * Returns the current instruction path of the lexer.
     * @returns {string[]}
     */
    get path(): string[];
    /**
     * Returns the position of the cursor in the code.
     * @returns {string}
     */
    get position(): number;
}
