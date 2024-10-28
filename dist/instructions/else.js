"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const BaseInstruction_1 = require("../classes/core/BaseInstruction");
const Nodes_1 = require("../classes/core/Nodes");
const makeIdentifier_1 = __importDefault(require("../utils/functions/makeIdentifier"));
const makePattern_1 = __importDefault(require("../utils/functions/makePattern"));
/**
 * @name $else
 * @description Executes a JavaScript "else" statement.
 * @returns {unknown}
 */
class default_1 extends BaseInstruction_1.BaseInstruction {
    constructor() {
        super(...arguments);
        this.patterns = (0, makePattern_1.default)('$else', true);
        this.description = 'Executes a JavaScript "else" statement.';
        this.params = [
            {
                name: 'Code',
                description: 'Code to execute if the condition is true.',
                type: BaseInstruction_1.ReturnType.Unknown,
                required: true,
                spread: false
            }
        ];
        this.identifier = (0, makeIdentifier_1.default)(__filename);
        this.returnType = BaseInstruction_1.ReturnType.Unknown;
        this.version = '2.0.0';
    }
    resolve({ inside = '' }) {
        const [code] = this.splitByDelimiter(inside);
        const codeTokens = [...this.transpiler.lexer.tokenize(code)];
        return new Nodes_1.OperatorNode({
            elements: [
                new Nodes_1.LiteralNode('else'),
                new Nodes_1.BlockNode(this.transpiler.bulkNodify(codeTokens))
            ],
            operator: ' '
        });
    }
}
exports.default = default_1;
