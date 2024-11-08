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
 * @name $endsWith
 * @description Check if a text ends with a value.
 * @returns {boolean}
 */
class default_1 extends BaseInstruction_1.BaseInstruction {
    constructor() {
        super(...arguments);
        this.patterns = (0, makePattern_1.default)('$endsWith', true);
        this.description = 'Check if a text ends with a value.';
        this.params = [
            {
                name: 'Text',
                description: 'The base text to validate.',
                type: BaseInstruction_1.ReturnType.String,
                required: true,
                spread: false
            },
            {
                name: 'Value',
                description: 'The value to look for in the base text.',
                type: BaseInstruction_1.ReturnType.String,
                required: true,
                spread: false
            }
        ];
        this.identifier = (0, makeIdentifier_1.default)(__filename);
        this.returnType = BaseInstruction_1.ReturnType.Boolean;
        this.version = '2.0.0';
    }
    resolve({ inside = '' }) {
        const [text, value] = this.splitByDelimiter(inside);
        return new Nodes_1.OperatorNode({
            elements: [
                this.transpiler.resolveString(text),
                new Nodes_1.CallNode({
                    callee: new Nodes_1.LiteralNode('endsWith'),
                    parameters: new Nodes_1.OperatorNode({
                        elements: [this.transpiler.resolveString(value)],
                        operator: ', '
                    }),
                    zero: false
                })
            ],
            operator: '.'
        });
    }
}
exports.default = default_1;