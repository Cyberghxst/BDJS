"use strict";
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _Lexer_instances, _a, _Lexer_code, _Lexer_count, _Lexer_path, _Lexer_position, _Lexer_line, _Lexer_tokens, _Lexer_addToken, _Lexer_advance, _Lexer_chars, _Lexer_createInstruction, _Lexer_isFunctionStart, _Lexer_makeId, _Lexer_parseInstruction, _Lexer_parseInside;
Object.defineProperty(exports, "__esModule", { value: true });
exports.Lexer = exports.mainInstruction = exports.InstructionToken = void 0;
const InstructionManager_1 = require("../managers/InstructionManager");
/**
 * Represents an instruction in the AST.
 */
class InstructionToken {
    /**
     * Creates a new instance of the `InstructionToken` class.
     * @param bounds - The bounds the token is in.
     * @param lines - The lines that this token is on.
     */
    constructor(bounds, lines) {
        /**
         * The name this instruction has.
         */
        this.name = '';
        /**
         * The prefix this instruction has.
         */
        this.prefix = '$';
        /**
         * The content inside the instruction.
         * Fallbacks to `null` if no content.
         */
        this.inside = null;
        /**
         * The splitted fields inside the instruction.
         * Fallbacks to `null` if no fields.
         */
        this.fields = null;
        /**
         * Whether this instruction is supressed.
         * @default false
         */
        this.supressed = false;
        /**
         * Whether this instruction is closed.
         * @default false
         */
        this.closed = false;
        /**
         * The ID of this instruction in the AST.
         * @default '#INSTRUCTION_0#'
         */
        this.id = '#INSTRUCTION_0#';
        /**
         * The path of this instruction.
         * @example
         * '$log[$toLowerCase[$get[name]]]' // ['$log', '$toLowerCase', '$get']
         */
        this.path = [];
        /**
         * The parent instruction this child may have.
         * Fallbacks to `null` if no parent.
         */
        this.parent = null;
        /**
         * The children instructions this parent may have.
         */
        this.children = [];
        /**
         * The field this instruction is located in the parent function.
         * Fallbacks to `null` if no parent.
         */
        this.from = null;
        /**
         * Instruction metadata pulled from the instruction manager.
         * Fallbacks to `null` if no data found.
         */
        this.data = null;
        this.bounds = bounds ?? [];
        this.lines = lines ?? [];
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
 * The main instruction of a BDJS code.
 */
exports.mainInstruction = '$BDJSEXECUTEDATA';
/**
 * This class creates an abstract syntax tree from code.
 */
class Lexer {
    /**
     * Creates a new instance of the `Lexer` class.
     * @param code - The code to be analyzed.
     * @param options - Lexer setup options.
     */
    constructor(code, options) {
        _Lexer_instances.add(this);
        /**
         * The input code to be analyzed.
         */
        _Lexer_code.set(this, ''
        /**
         * The count of compiled instructions.
         */
        );
        /**
         * The count of compiled instructions.
         */
        _Lexer_count.set(this, 0
        /**
         * The current instruction path of the lexer.
         */
        );
        /**
         * The current instruction path of the lexer.
         */
        _Lexer_path.set(this, []
        /**
         * The position of the cursor in the code.
         */
        );
        /**
         * The position of the cursor in the code.
         */
        _Lexer_position.set(this, 0
        /**
         * The line the cursor is on.
         */
        );
        /**
         * The line the cursor is on.
         */
        _Lexer_line.set(this, 1
        /**
         * The compiled tokens from input code.
         */
        );
        /**
         * The compiled tokens from input code.
         */
        _Lexer_tokens.set(this, []
        /**
         * The lexer setup options.
         */
        );
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
            __classPrivateFieldSet(this, _Lexer_code, `${exports.mainInstruction}[${code}]`, "f");
        else
            __classPrivateFieldSet(this, _Lexer_code, code, "f");
        __classPrivateFieldSet(this, _Lexer_position, 0, "f"); // Moving to start.
        this.path.push(...this.options?.path ?? []); // Pushing inherited paths.
        __classPrivateFieldSet(this, _Lexer_count, this.options?.count ?? __classPrivateFieldGet(this, _Lexer_count, "f"), "f"); // Seting the inherited count.
    }
    /**
     * Tokenizes the input code to an AST.
     * @returns {InstructionToken<boolean>[]}
     */
    toAST() {
        while (this.position < __classPrivateFieldGet(this, _Lexer_code, "f").length) {
            if (__classPrivateFieldGet(this, _Lexer_instances, "m", _Lexer_isFunctionStart).call(this)) {
                __classPrivateFieldGet(this, _Lexer_instances, "m", _Lexer_parseInstruction).call(this);
            }
            __classPrivateFieldGet(this, _Lexer_instances, "m", _Lexer_advance).call(this);
        }
        return __classPrivateFieldGet(this, _Lexer_tokens, "f");
    }
    /**
     * Returns the current line the cursor is on.
     * @returns {number}
     */
    get line() {
        return __classPrivateFieldGet(this, _Lexer_line, "f");
    }
    /**
     * Returns the current instruction path of the lexer.
     * @returns {string[]}
     */
    get path() {
        return __classPrivateFieldGet(this, _Lexer_path, "f");
    }
    /**
     * Returns the position of the cursor in the code.
     * @returns {string}
     */
    get position() {
        return __classPrivateFieldGet(this, _Lexer_position, "f");
    }
}
exports.Lexer = Lexer;
_a = Lexer, _Lexer_code = new WeakMap(), _Lexer_count = new WeakMap(), _Lexer_path = new WeakMap(), _Lexer_position = new WeakMap(), _Lexer_line = new WeakMap(), _Lexer_tokens = new WeakMap(), _Lexer_instances = new WeakSet(), _Lexer_addToken = function _Lexer_addToken(token) {
    __classPrivateFieldGet(this, _Lexer_tokens, "f").push(token);
}, _Lexer_advance = function _Lexer_advance(amount = 1) {
    __classPrivateFieldSet(this, _Lexer_position, __classPrivateFieldGet(this, _Lexer_position, "f") + amount, "f");
}, _Lexer_chars = function _Lexer_chars() {
    return {
        current: __classPrivateFieldGet(this, _Lexer_code, "f")[this.position],
        next: __classPrivateFieldGet(this, _Lexer_code, "f")[this.position + 1]
    };
}, _Lexer_createInstruction = function _Lexer_createInstruction(id) {
    const instruction = new InstructionToken();
    instruction.id = id;
    return instruction;
}, _Lexer_isFunctionStart = function _Lexer_isFunctionStart() {
    return __classPrivateFieldGet(this, _Lexer_instances, "m", _Lexer_chars).call(this).current === '$' && __classPrivateFieldGet(this, _Lexer_instances, "m", _Lexer_chars).call(this).next && !!__classPrivateFieldGet(this, _Lexer_instances, "m", _Lexer_chars).call(this).next.match(/[\.a-z]/i);
}, _Lexer_makeId = function _Lexer_makeId() {
    var _b, _c;
    return `#INSTRUCTION_${Math.floor((__classPrivateFieldSet(this, _Lexer_count, (_c = __classPrivateFieldGet(this, _Lexer_count, "f"), _b = _c++, _c), "f"), _b) * Math.random() * 999999999)}#`;
}, _Lexer_parseInstruction = function _Lexer_parseInstruction() {
    const i = __classPrivateFieldGet(this, _Lexer_instances, "m", _Lexer_createInstruction).call(this, __classPrivateFieldGet(this, _Lexer_instances, "m", _Lexer_makeId).call(this));
    i.bounds.push(this.position);
    i.lines.push(this.line);
    __classPrivateFieldGet(this, _Lexer_instances, "m", _Lexer_advance).call(this); // Omit "$".
    if (__classPrivateFieldGet(this, _Lexer_instances, "m", _Lexer_chars).call(this).current === '.') {
        i.setSupressed(); // Mark as supressed.
        __classPrivateFieldGet(this, _Lexer_instances, "m", _Lexer_advance).call(this); // Omit suppression char.
    }
    // While current char is letter.
    while (__classPrivateFieldGet(this, _Lexer_instances, "m", _Lexer_chars).call(this).current && __classPrivateFieldGet(this, _Lexer_instances, "m", _Lexer_chars).call(this).current.match(/[a-zA-Z]/)) {
        i.name += __classPrivateFieldGet(this, _Lexer_instances, "m", _Lexer_chars).call(this).current;
        __classPrivateFieldGet(this, _Lexer_instances, "m", _Lexer_advance).call(this);
    }
    // Pulling the instruction metadata.
    i.pullMetadata();
    if (__classPrivateFieldGet(this, _Lexer_instances, "m", _Lexer_chars).call(this).current !== '[') {
        i.setFieldless();
        i.bounds.push(this.position);
        i.setClosed();
        __classPrivateFieldGet(this, _Lexer_instances, "m", _Lexer_addToken).call(this, i);
        return;
    }
    let depth = 0; // Instruction depth control.
    i.inside = ''; // Preparing the instruction inside.
    while (__classPrivateFieldGet(this, _Lexer_instances, "m", _Lexer_chars).call(this).current) {
        if (__classPrivateFieldGet(this, _Lexer_instances, "m", _Lexer_chars).call(this).current === '[')
            depth++;
        else if (__classPrivateFieldGet(this, _Lexer_instances, "m", _Lexer_chars).call(this).current === ']')
            depth--;
        i.inside += __classPrivateFieldGet(this, _Lexer_instances, "m", _Lexer_chars).call(this).current;
        if (__classPrivateFieldGet(this, _Lexer_instances, "m", _Lexer_chars).call(this).current === ']' && depth === 0)
            break;
        __classPrivateFieldGet(this, _Lexer_instances, "m", _Lexer_advance).call(this);
    }
    i.inside = i.inside.slice(1, -1); // Remove "[" and "]".
    const fields = __classPrivateFieldGet(this, _Lexer_instances, "m", _Lexer_parseInside).call(this, i, i.inside);
    i.fields = fields;
    i.bounds.push(this.position);
    i.setClosed();
    __classPrivateFieldGet(this, _Lexer_instances, "m", _Lexer_addToken).call(this, i);
}, _Lexer_parseInside = function _Lexer_parseInside(token, args) {
    var _b;
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
            __classPrivateFieldSet(this, _Lexer_line, (_b = __classPrivateFieldGet(this, _Lexer_line, "f"), _b++, _b), "f");
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
                count: __classPrivateFieldGet(this, _Lexer_count, "f") + 1
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
};
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
     * Creates a new instance of the LexerError class.
     * @param {LexerErrorReason} reason - The error reason.
     * @param {string[]} values - The values to replace in the reason text.
     * @returns {LexerError}
     */
    constructor(reason, ...values) {
        super(resolvePlaceholders(reason, ...values));
        /**
         * The name of this error.
         */
        this.name = 'LexerError';
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
