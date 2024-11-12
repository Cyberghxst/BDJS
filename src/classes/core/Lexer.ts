import { Instruction } from '@structures/Instruction'
import { InstructionManager } from '../managers/InstructionManager'

/**
 * Represents an AST token.
 */
export interface IBaseToken {
    /**
     * The start and end positions this token is in.
     */
    bounds: [number, number]
    /**
     * The lines that this token is on.
     */
    lines: number[]
    /**
     * The string representation of this token.
     */
    toString(): string
}

/**
 * Represents an instruction field value in the AST.
 */
export interface InstructionFieldValue {
    /**
     * The entire value.
     */
    value: string
}

/**
 * Represents an instruction in the AST.
 */
export class InstructionToken implements IBaseToken {
    /**
     * The bounds the token is in.
     */
    public bounds: [number, number]

    /**
     * The lines that this token is on.
     */
    public lines: number[]

    /**
     * The name this instruction has.
     */
    public name: string = ''

    /**
     * The prefix this instruction has.
     */
    public prefix: string = '$'

    /**
     * The content inside the instruction.
     * Fallbacks to `null` if no content.
     */
    public inside: string | null = null

    /**
     * The splitted fields inside the instruction.
     * Fallbacks to `null` if no fields.
     */
    public fields: InstructionFieldValue[] | null = null

    /**
     * Whether this instruction is supressed.
     * @default false
     */
    public supressed: boolean = false

    /**
     * Whether this instruction is closed.
     * @default false
     */
    public closed: boolean = false
    
    /**
     * The ID of this instruction in the AST.
     * @default '#INSTRUCTION_0#'
     */
    public id: `#INSTRUCTION_${number}#` = '#INSTRUCTION_0#'

    /**
     * The path of this instruction.
     * @example
     * '$log[$toLowerCase[$get[name]]]' // ['$log', '$toLowerCase', '$get']
     */
    public path: string[] = []

    /**
     * The parent instruction this child may have.
     * Fallbacks to `null` if no parent.
     */
    public parent: InstructionToken | null = null

    /**
     * The children instructions this parent may have.
     */
    public children: InstructionToken[] = []

    /**
     * The field this instruction is located in the parent function.
     * Fallbacks to `null` if no parent.
     */
    public from: number | null = null

    /**
     * Instruction metadata pulled from the instruction manager.
     * Fallbacks to `null` if no data found.
     */
    public data: Instruction | null = null

    /**
     * Creates a new instance of the `InstructionToken` class.
     * @param bounds - The bounds the token is in.
     * @param lines - The lines that this token is on.
     */
    constructor(
        bounds?: [number, number],
        lines?: number[]
    ) {
        this.bounds = bounds ?? [] as unknown as [number, number]
        this.lines = lines ?? []
    }

    /**
     * Check whether this instruction is fieldless.
     * @returns {this is this & { inside: null, fields: null }}
     */
    public isFieldless(): this is this & { inside: null, fields: null } {
        return this.inside === null && this.fields === null
    }

    /**
     * Pulls instruction metadata from the instruction manager.
     * @returns {void}
     */
    public pullMetadata() {
        this.data = InstructionManager.pull((i) => i.name.toLowerCase().includes(this.name.toLowerCase()))
    }

    /**
     * Whether mark this instruction as closed.
     * @param state - Closure state.
     * @returns {void}
     */
    public setClosed(state = true) {
        this.closed = state
    }

    /**
     * Marks this instruction as fieldless.
     * @returns {void}
     */
    public setFieldless() {
        this.inside = null, this.fields = null
    }

    /**
     * Whether mark this instruction as suppresed.
     * @param state - Suppression state.
     * @returns {void}
     */
    public setSupressed(state = true) {
        this.supressed = state
    }

    /**
     * Returns the string representation of this token.
     * @returns {string}
     */
    public toString() {
        if (!this.inside) return this.prefix + this.name;

        return `${this.prefix}${this.name}[${this.inside}]`
    }
}

/**
 * The main instruction of a BDJS code.
 */
export const mainInstruction = '$BDJSEXECUTEDATA'

/**
 * The setup options of the lexer.
 */
export interface ILexerOptions {
    /**
     * Whether add the main instruction to the input code.
     */
    addMainInstruction: boolean
    /**
     * Inherits compiled instructions count from a parent lexer.
     */
    count: number
    /**
     * Inherits compiled instructions path from a parent lexer.
     */
    path: string[]
}

/**
 * This class creates an abstract syntax tree from code.
 */
export class Lexer {
    /**
     * The input code to be analyzed.
     */
    #code = ''

    /**
     * The count of compiled instructions.
     */
    #count = 0

    /**
     * The current instruction path of the lexer.
     */
    #path: string[] = []

    /**
     * The position of the cursor in the code.
     */
    #position = 0

    /**
     * The line the cursor is on.
     */
    #line = 1

    /**
     * The compiled tokens from input code.
     */
    #tokens: InstructionToken[] = []

    /**
     * The lexer setup options.
     */
    private options: Partial<ILexerOptions>

    /**
     * Creates a new instance of the `Lexer` class.
     * @param code - The code to be analyzed.
     * @param options - Lexer setup options.
     */
    constructor(code: string, options?: Partial<ILexerOptions>) {
        this.options = {
            addMainInstruction: options?.addMainInstruction ?? true,
            path: options?.path ?? [],
            count: options?.count ?? 0
        }

        this.setInput(code)
    }

    /**
     * Set the input code for the analysis.
     * @param code - The input code.
     * @returns {void}
     */
    public setInput(code: string) {
        if (this.options?.addMainInstruction) this.#code = `${mainInstruction}[${code}]`;
        else this.#code = code;

        this.#position = 0 // Moving to start.
        this.path.push(...this.options?.path ?? []) // Pushing inherited paths.
        this.#count = this.options?.count ?? this.#count // Seting the inherited count.
    }

    /**
     * Tokenizes the input code to an AST.
     * @returns {InstructionToken<boolean>[]}
     */
    public toAST() {
        while (this.position < this.#code.length) {
            if (this.#isFunctionStart()) {
                this.#parseInstruction()
            }

            this.#advance()
        }

        return this.#tokens
    }

    /**
     * Adds a token to the token registry.
     * @param token - The token to be added.
     * @returns {void}
     */
    #addToken(token: InstructionToken) {
        this.#tokens.push(token)
    }

    /**
     * Advances the given amount of positions in the code.
     * @param amount - The amount to advance in the code.
     * @returns {void}
     */
    #advance(amount = 1) {
        this.#position += amount
    }

    /**
     * Returns the current characters based on the current position.
     * @returns {Record<'current' | 'next', string>}
     */
    #chars() {
        return {
            current: this.#code[this.position],
            next: this.#code[this.position + 1]
        }
    }

    /**
     * Creates an instruction token.
     * @returns {InstructionToken}
     */
    #createInstruction(id: InstructionToken['id']) {
        const instruction = new InstructionToken()

        instruction.id = id

        return instruction
    }

    /**
     * Check whether current characters indicates a function start.
     * @returns {boolean}
     */
    #isFunctionStart() {
        return this.#chars().current === '$' && this.#chars().next && !!this.#chars().next.match(/[\.a-z]/i)
    }

    /**
     * Makes an instruction ID.
     * @returns {InstructionToken['id']}
     */
    #makeId(): InstructionToken['id'] {
        return `#INSTRUCTION_${Math.floor(this.#count++ * Math.random() * 999999999)}#`
    }

    /**
     * Parses an instruction from the input code.
     * @returns {void}
     */
    #parseInstruction() {
        const i = this.#createInstruction(this.#makeId())
        i.bounds.push(this.position)
        i.lines.push(this.line)

        this.#advance() // Omit "$".

        if (this.#chars().current === '.') {
            i.setSupressed() // Mark as supressed.
            this.#advance() // Omit suppression char.
        }

        // While current char is letter.
        while (this.#chars().current && this.#chars().current.match(/[a-zA-Z]/)) {
            i.name += this.#chars().current
            this.#advance()
        }

        // Pulling the instruction metadata.
        i.pullMetadata()

        if (this.#chars().current !== '[') {
            i.setFieldless()
            i.bounds.push(this.position)
            i.setClosed()

            this.#addToken(i)
            return;
        }

        let depth = 0 // Instruction depth control.
        i.inside = '' // Preparing the instruction inside.

        while (this.#chars().current) {
            if (this.#chars().current === '[') depth++;
            else if (this.#chars().current === ']') depth--;

            i.inside += this.#chars().current;

            if (this.#chars().current === ']' && depth === 0) break;

            this.#advance()
        }

        i.inside = i.inside.slice(1, -1) // Remove "[" and "]".

        const fields = this.#parseInside(i, i.inside)
        i.fields = fields
        i.bounds.push(this.position)
        i.setClosed()

        this.#addToken(i)
    }

    /**
     * Parses the "inside" of an instruction.
     * @param {InstructionToken} token - The token of the instruction.
     * @param {string} args - The string args of the instruction.
     * @returns {InstructionFieldValue[]}
     */
    #parseInside(token: InstructionToken, args: string): InstructionFieldValue[] {
        const splits: string[] = []
        let current = '', depth = 0

        for (const char of args) {
            if (char === '[') depth++;
            else if (char === ']') depth--;

            if (char === ';' && depth === 0) {
                splits.push(current)
                current = ''
            } else current += char

            if (char === '\n') {
                this.#line++;
                token.lines.push(this.line)
            }
        }

        if (current !== '') splits.push(current);

        return splits.map((value, i) => {
            if (!value.includes(token.prefix)) return { value };
            else {
                const lexer = new Lexer(value, {
                    addMainInstruction: false,
                    count: this.#count + 1
                })

                const nested = lexer.toAST()
                token.children.push(...nested.map(x => {
                    x.path = [...this.path, token.prefix + token.name]
                    // x.parent = token
                    x.from = i
                    return x
                }))

                return { value }
            }
        })
    }

    /**
     * Returns the current line the cursor is on.
     * @returns {number}
     */
    public get line() {
        return this.#line
    }

    /**
     * Returns the current instruction path of the lexer.
     * @returns {string[]}
     */
    public get path() {
        return this.#path
    }

    /**
     * Returns the position of the cursor in the code.
     * @returns {string}
     */
    public get position() {
        return this.#position
    }
}

/**
 * Various error reasons the AST generator can throw.
 */
enum LexerErrorReason {
    InvalidFunction = '"$0" is not a function.',
    NotClosed = '"$0" is not closed.'
}

/**
 * Throws an AST generator error.
 */
class LexerError extends Error {
    /**
     * The name of this error.
     */
    name = 'LexerError';
    /**
     * Creates a new instance of the LexerError class.
     * @param {LexerErrorReason} reason - The error reason.
     * @param {string[]} values - The values to replace in the reason text.
     * @returns {LexerError}
     */
    constructor(reason: LexerErrorReason, ...values: string[]) {
        super(resolvePlaceholders(reason, ...values))
    }
};

/**
 * Resolve the error placeholders.
 * @param {string} text - The text to be resolved.
 * @param {string[]} values - The values to be replaced with in the text.
 * @returns {string}
 * @example
 * resolvePlaceholders('Function "$0" was not closed at line "$1"', '$try', '1')
 */
const resolvePlaceholders = (text: string, ...values: string[]) => {
    return text.replace(/\$\d/g, (got) => {
        return values.at(parseInt(got.slice(1))) || ''
    })
}