"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Nodes_1 = require("../classes/core/Nodes");
const BaseInstruction_1 = require("../classes/core/BaseInstruction");
const makeIdentifier_1 = __importDefault(require("../utils/functions/makeIdentifier"));
const makePattern_1 = __importDefault(require("../utils/functions/makePattern"));
/**
 * @name $try
 * @description Executes a JavaScript "try" statement.
 * @returns {unknown}
 */
class default_1 extends BaseInstruction_1.BaseInstruction {
    constructor() {
        super(...arguments);
        this.patterns = (0, makePattern_1.default)('$try', true);
        this.description = 'Executes a JavaScript "try" statement.';
        this.params = [
            {
                name: 'Code',
                description: 'Code to execute.',
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
        return new Nodes_1.ControlFlowNode({
            indicator: new Nodes_1.LiteralNode('try'),
            consequent: [new Nodes_1.BlockNode(this.transpiler.bulkNodify(codeTokens))]
        });
    }
}
exports.default = default_1;
