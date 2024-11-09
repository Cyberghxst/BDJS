"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const BaseInstruction_1 = require("@core/BaseInstruction");
const Nodes_1 = require("@core/Nodes");
const makeIdentifier_1 = __importDefault(require("@functions/makeIdentifier"));
const makePattern_1 = __importDefault(require("@functions/makePattern"));
/**
 * @name $catch
 * @description Executes a JavaScript "catch" statement.
 * @returns {unknown}
 */
class default_1 extends BaseInstruction_1.BaseInstruction {
    constructor() {
        super(...arguments);
        this.patterns = (0, makePattern_1.default)('$catch', true);
        this.description = 'Executes a JavaScript "catch" statement.';
        this.params = [
            {
                name: 'Code',
                description: 'Code to execute.',
                type: BaseInstruction_1.ReturnType.Unknown,
                required: true,
                spread: false
            },
            {
                name: 'Variable',
                description: 'Variable name to load the error to.',
                type: BaseInstruction_1.ReturnType.String,
                required: false,
                spread: false
            }
        ];
        this.identifier = (0, makeIdentifier_1.default)(__filename);
        this.returnType = BaseInstruction_1.ReturnType.Unknown;
        this.version = '2.0.0';
    }
    resolve({ inside = '' }) {
        const [code, variable] = this.splitByDelimiter(inside);
        const codeTokens = [...this.transpiler.lexer.tokenize(code)];
        return new Nodes_1.ControlFlowNode({
            indicator: new Nodes_1.CallNode({
                callee: new Nodes_1.LiteralNode('catch'),
                parameters: new Nodes_1.OperatorNode({ elements: [new Nodes_1.LiteralNode(variable || 'e')], operator: '' }),
                zero: false
            }),
            consequent: [new Nodes_1.BlockNode(this.transpiler.bulkNodify(codeTokens))]
        });
    }
}
exports.default = default_1;
