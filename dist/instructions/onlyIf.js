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
 * @name $onlyIf
 * @description Execute an error code if the condition is not met.
 * @returns {unknown}
 */
class default_1 extends BaseInstruction_1.BaseInstruction {
    constructor() {
        super(...arguments);
        this.patterns = (0, makePattern_1.default)('$onlyIf', true);
        this.description = 'Execute an error code if the condition is not met.';
        this.params = [
            {
                name: 'Condition',
                description: 'Condition to validate.',
                type: BaseInstruction_1.ReturnType.Unknown,
                required: true,
                spread: false
            },
            {
                name: 'Error Code',
                description: 'Code to execute if the condition is not true.',
                type: BaseInstruction_1.ReturnType.String,
                required: false,
                spread: false
            }
        ];
        this.identifier = (0, makeIdentifier_1.default)(__filename);
        this.returnType = BaseInstruction_1.ReturnType.Boolean;
        this.version = '2.0.0';
    }
    resolve({ inside = '' }) {
        const [condition, code] = this.splitByDelimiter(inside);
        const codeTokens = [...this.transpiler.lexer.tokenize(code)];
        return new Nodes_1.ControlFlowNode({
            indicator: new Nodes_1.CallNode({
                callee: new Nodes_1.LiteralNode('if'),
                parameters: new Nodes_1.OperatorNode({
                    elements: [new Nodes_1.LiteralNode(`!(${this.transpiler.resolveCondition(condition).serialize()})`)],
                    operator: ''
                }),
                zero: false
            }),
            consequent: [
                new Nodes_1.BlockNode([
                    ...this.transpiler.bulkNodify(codeTokens),
                    new Nodes_1.LiteralNode('return;')
                ]),
            ]
        });
    }
}
exports.default = default_1;
