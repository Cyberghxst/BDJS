"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.Lexer = exports.mainInstruction = exports.CompiledInstruction = exports.InstructionThisArg = exports.InstructionToken = void 0;
const createInstructionThisArg_1 = __importDefault(require("../../utils/functions/createInstructionThisArg"));
const InstructionManager_1 = require("../managers/InstructionManager");
const Instruction_1 = require("../structures/Instruction");
const Return_1 = require("./Return");
/**
 * Represents an instruction in the AST.
 */
class InstructionToken {
    /**
     * The bounds the token is in.
     */
    bounds;
    /**
     * The lines that this token is on.
     */
    lines;
    /**
     * The name this instruction has.
     */
    name = '';
    /**
     * The prefix this instruction has.
     */
    prefix = '$';
    /**
     * The content inside the instruction.
     * Fallbacks to `null` if no content.
     */
    inside = null;
    /**
     * The splitted fields inside the instruction.
     * Fallbacks to `null` if no fields.
     */
    fields = null;
    /**
     * Whether this instruction is supressed.
     * @default false
     */
    supressed = false;
    /**
     * Whether this instruction is closed.
     * @default false
     */
    closed = false;
    /**
     * The ID of this instruction in the AST.
     * @default '#INSTRUCTION_0#'
     */
    id = '#INSTRUCTION_0#';
    /**
     * The path of this instruction.
     * @example
     * '$log[$toLowerCase[$get[name]]]' // ['$log', '$toLowerCase', '$get']
     */
    path = [];
    /**
     * The parent instruction this child may have.
     * Fallbacks to `null` if no parent.
     */
    // public parent: InstructionToken | null = null
    /**
     * The children instructions this parent may have.
     */
    children = [];
    /**
     * The field this instruction is located in the parent function.
     * Fallbacks to `null` if no parent.
     */
    from = null;
    /**
     * Instruction metadata pulled from the instruction manager.
     * Fallbacks to `null` if no data found.
     */
    data = null;
    /**
     * Creates a new instance of the `InstructionToken` class.
     * @param bounds - The bounds the token is in.
     * @param lines - The lines that this token is on.
     */
    constructor(bounds, lines) {
        this.bounds = bounds ?? [];
        this.lines = lines ?? [];
    }
    /**
     * Check whether this token has instruction metadata pulled.
     * @returns {this is this & { data: Instruction }}
     */
    hasData() {
        return this.data !== null && this.data instanceof Instruction_1.Instruction;
    }
    /**
     * Check whether this instruction is fieldless.
     * @returns {this is this & { inside: null, fields: null }}
     */
    isFieldless() {
        return this.inside === null && this.fields === null;
    }
    /**
     * Pulls instruction metadata from the instruction manager.
     * @returns {void}
     */
    pullMetadata() {
        this.data = InstructionManager_1.InstructionManager.pull((i) => i.name.toLowerCase().includes(this.name.toLowerCase()));
    }
    /**
     * Whether mark this instruction as closed.
     * @param state - Closure state.
     * @returns {void}
     */
    setClosed(state = true) {
        this.closed = state;
    }
    /**
     * Marks this instruction as fieldless.
     * @returns {void}
     */
    setFieldless() {
        this.inside = null, this.fields = null;
    }
    /**
     * Whether mark this instruction as suppresed.
     * @param state - Suppression state.
     * @returns {void}
     */
    setSupressed(state = true) {
        this.supressed = state;
    }
    /**
     * Returns the string representation of this token.
     * @returns {string}
     */
    toString() {
        if (!this.inside)
            return this.prefix + this.name;
        return `${this.prefix}${this.name}[${this.inside}]`;
    }
}
exports.InstructionToken = InstructionToken;
/**
 * The "this" context of a compiled instruction.
 */
class InstructionThisArg extends InstructionToken {
    runtime;
    /**
     * Creates a new instance of the `InstructionThisArg` class.
     * @param token - The token to be inherited.
     * @param runtime - The current runtime context.
     * @returns {InstructionThisArg}
     */
    constructor(token, runtime) {
        super(token.bounds, token.lines);
        this.runtime = runtime;
        Object.assign(this, token);
    }
    /**
     * Returns a success statement.
     * @returns {Return<ReturnType.Success, unknown>}
     */
    ok() {
        return Return_1.Return.success();
    }
    /**
     * Returns a value.
     * @param value - The value to return.
     * @returns {Return<ReturnType.ReturnKeyword, string | undefined>}
     */
    return(value) {
        return new Return_1.Return(Return_1.ReturnType.ReturnKeyword, value);
    }
}
exports.InstructionThisArg = InstructionThisArg;
/**
 * Represents a compiled instruction by the lexer.
 */
class CompiledInstruction extends InstructionToken {
    runtime;
    /**
     * The "this" context for the instruction executor.
     */
    thisArg;
    /**
     * Creates a new instance of the `CompiledInstruction` class.
     * @param token - The token to be used as reference.
     * @param runtime - The current runtime context.
     */
    constructor(token, runtime) {
        super(token.bounds, token.lines);
        this.runtime = runtime;
        Object.assign(this, token);
        this.thisArg = (0, createInstructionThisArg_1.default)(token, runtime);
    }
    /**
     * Calls the instruction executor.
     */
    async call(values = []) {
        if (!this.data.data.compile)
            return this.data.run.call(this.thisArg, this.runtime);
        // @ts-ignore
        return this.data.run.call(this.thisArg, this.runtime, values);
    }
}
exports.CompiledInstruction = CompiledInstruction;
/**
 * The main instruction of a BDJS code.
 */
exports.mainInstruction = '$BDJSEXECUTEDATA';
/**
 * This class creates an abstract syntax tree from code.
 */
class Lexer {
    /**
     * The input code to be analyzed.
     */
    #code = '';
    /**
     * The count of compiled instructions.
     */
    #count = 0;
    /**
     * The current instruction path of the lexer.
     */
    #path = [];
    /**
     * The position of the cursor in the code.
     */
    #position = 0;
    /**
     * The line the cursor is on.
     */
    #line = 1;
    /**
     * The compiled tokens from input code.
     */
    #tokens = [];
    /**
     * The lexer setup options.
     */
    options;
    /**
     * Creates a new instance of the `Lexer` class.
     * @param code - The code to be analyzed.
     * @param options - Lexer setup options.
     */
    constructor(code, options) {
        this.options = {
            addMainInstruction: options?.addMainInstruction ?? true,
            path: options?.path ?? [],
            count: options?.count ?? 0
        };
        this.setInput(code);
    }
    /**
     * Set the input code for the analysis.
     * @param code - The input code.
     * @returns {void}
     */
    setInput(code) {
        if (this.options?.addMainInstruction)
            this.#code = `${exports.mainInstruction}[${code}]`;
        else
            this.#code = code;
        this.#position = 0; // Moving to start.
        this.path.push(...this.options?.path ?? []); // Pushing inherited paths.
        this.#count = this.options?.count ?? this.#count; // Seting the inherited count.
    }
    /**
     * Tokenizes the input code to an AST.
     * @returns {InstructionToken<boolean>[]}
     */
    toAST() {
        while (this.position < this.#code.length) {
            if (this.#isFunctionStart()) {
                this.#parseInstruction();
            }
            this.#advance();
        }
        return this.#tokens;
    }
    /**
     * Adds a token to the token registry.
     * @param token - The token to be added.
     * @returns {void}
     */
    #addToken(token) {
        this.#tokens.push(token);
    }
    /**
     * Advances the given amount of positions in the code.
     * @param amount - The amount to advance in the code.
     * @returns {void}
     */
    #advance(amount = 1) {
        this.#position += amount;
    }
    /**
     * Returns the current characters based on the current position.
     * @returns {Record<'current' | 'next', string>}
     */
    #chars() {
        return {
            current: this.#code[this.position],
            next: this.#code[this.position + 1]
        };
    }
    /**
     * Creates an instruction token.
     * @returns {InstructionToken}
     */
    #createInstruction(id) {
        const instruction = new InstructionToken();
        instruction.id = id;
        return instruction;
    }
    /**
     * Check whether current characters indicates a function start.
     * @returns {boolean}
     */
    #isFunctionStart() {
        return this.#chars().current === '$' && this.#chars().next && !!this.#chars().next.match(/[\.a-z]/i);
    }
    /**
     * Makes an instruction ID.
     * @returns {InstructionToken['id']}
     */
    #makeId() {
        return `#INSTRUCTION_${Math.floor(this.#count++ * Math.random() * 999999999)}#`;
    }
    /**
     * Parses an instruction from the input code.
     * @returns {void}
     */
    #parseInstruction() {
        const i = this.#createInstruction(this.#makeId());
        i.bounds.push(this.position);
        i.lines.push(this.line);
        this.#advance(); // Omit "$".
        if (this.#chars().current === '.') {
            i.setSupressed(); // Mark as supressed.
            this.#advance(); // Omit suppression char.
        }
        // While current char is letter.
        while (this.#chars().current && this.#chars().current.match(/[a-zA-Z]/)) {
            i.name += this.#chars().current;
            this.#advance();
        }
        // Pulling the instruction metadata.
        i.pullMetadata();
        if (this.#chars().current !== '[') {
            i.setFieldless();
            i.bounds.push(this.position);
            i.setClosed();
            this.#addToken(i);
            return;
        }
        let depth = 0; // Instruction depth control.
        i.inside = ''; // Preparing the instruction inside.
        while (this.#chars().current) {
            if (this.#chars().current === '[')
                depth++;
            else if (this.#chars().current === ']')
                depth--;
            i.inside += this.#chars().current;
            if (this.#chars().current === ']' && depth === 0)
                break;
            this.#advance();
        }
        i.inside = i.inside.slice(1, -1); // Remove "[" and "]".
        const fields = this.#parseInside(i, i.inside);
        i.fields = fields;
        i.bounds.push(this.position);
        i.setClosed();
        this.#addToken(i);
    }
    /**
     * Parses the "inside" of an instruction.
     * @param {InstructionToken} token - The token of the instruction.
     * @param {string} args - The string args of the instruction.
     * @returns {InstructionFieldValue[]}
     */
    #parseInside(token, args) {
        const splits = [];
        let current = '', depth = 0;
        for (const char of args) {
            if (char === '[')
                depth++;
            else if (char === ']')
                depth--;
            if (char === ';' && depth === 0) {
                splits.push(current);
                current = '';
            }
            else
                current += char;
            if (char === '\n') {
                this.#line++;
                token.lines.push(this.line);
            }
        }
        if (current !== '')
            splits.push(current);
        return splits.map((value, i) => {
            if (!value.includes(token.prefix))
                return { value };
            else {
                const lexer = new _a(value, {
                    addMainInstruction: false,
                    count: this.#count + 1
                });
                const nested = lexer.toAST();
                token.children.push(...nested.map(x => {
                    x.path = [...this.path, token.prefix + token.name];
                    // x.parent = token
                    x.from = i;
                    return x;
                }));
                return { value };
            }
        });
    }
    /**
     * Returns the current line the cursor is on.
     * @returns {number}
     */
    get line() {
        return this.#line;
    }
    /**
     * Returns the current instruction path of the lexer.
     * @returns {string[]}
     */
    get path() {
        return this.#path;
    }
    /**
     * Returns the position of the cursor in the code.
     * @returns {string}
     */
    get position() {
        return this.#position;
    }
}
exports.Lexer = Lexer;
_a = Lexer;
/**
 * Various error reasons the AST generator can throw.
 */
var LexerErrorReason;
(function (LexerErrorReason) {
    LexerErrorReason["InvalidFunction"] = "\"$0\" is not a function.";
    LexerErrorReason["NotClosed"] = "\"$0\" is not closed.";
})(LexerErrorReason || (LexerErrorReason = {}));
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
    constructor(reason, ...values) {
        super(resolvePlaceholders(reason, ...values));
    }
}
;
/**
 * Resolve the error placeholders.
 * @param {string} text - The text to be resolved.
 * @param {string[]} values - The values to be replaced with in the text.
 * @returns {string}
 * @example
 * resolvePlaceholders('Function "$0" was not closed at line "$1"', '$try', '1')
 */
const resolvePlaceholders = (text, ...values) => {
    return text.replace(/\$\d/g, (got) => {
        return values.at(parseInt(got.slice(1))) || '';
    });
};
