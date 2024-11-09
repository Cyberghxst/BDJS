"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Nodes_1 = require("@core/Nodes");
const BaseInstruction_1 = require("@core/BaseInstruction");
const makeIdentifier_1 = __importDefault(require("@functions/makeIdentifier"));
const makePattern_1 = __importDefault(require("@functions/makePattern"));
/**
 * @name $addField
 * @description Set the embed addField.
 * @returns {unknown}
 */
class default_1 extends BaseInstruction_1.BaseInstruction {
    constructor() {
        super(...arguments);
        this.patterns = (0, makePattern_1.default)('$addField', true);
        this.description = 'Adds an embed field.';
        this.params = [
            {
                name: 'Title',
                description: 'The text to set as field title.',
                type: BaseInstruction_1.ReturnType.String,
                required: true,
                spread: false
            },
            {
                name: 'Value',
                description: 'The text to set as field value.',
                type: BaseInstruction_1.ReturnType.String,
                required: true,
                spread: false
            },
            {
                name: 'Inline',
                description: 'Whether set the field inline.',
                type: BaseInstruction_1.ReturnType.Boolean,
                required: false,
                spread: false
            },
            {
                name: 'Index',
                description: 'The embed index to set the field to.',
                type: BaseInstruction_1.ReturnType.Number,
                required: false,
                spread: false
            }
        ];
        this.identifier = (0, makeIdentifier_1.default)(__filename);
        this.returnType = BaseInstruction_1.ReturnType.Unknown;
        this.version = '2.0.0';
    }
    resolve({ inside = '' }) {
        const [title, value, inline, index] = this.splitByDelimiter(inside);
        const keyValues = new Nodes_1.KeyValueNode([
            [new Nodes_1.LiteralNode('name'), this.transpiler.resolveString(title)],
            [new Nodes_1.LiteralNode('value'), this.transpiler.resolveString(value)],
            [new Nodes_1.LiteralNode('inline'), new Nodes_1.CallNode({
                    callee: new Nodes_1.LiteralNode('Boolean'),
                    parameters: new Nodes_1.OperatorNode({
                        elements: [this.transpiler.resolveString(inline || 'false')],
                        operator: ', '
                    }),
                    zero: false
                })]
        ]);
        return new Nodes_1.OperatorNode({
            elements: [
                new Nodes_1.CallNode({
                    callee: new Nodes_1.LiteralNode('runtime.container.getEmbed'),
                    parameters: new Nodes_1.OperatorNode({
                        elements: [
                            index !== undefined ? this.transpiler.resolveNumber(index) : new Nodes_1.LiteralNode('undefined')
                        ],
                        operator: ', '
                    }),
                    zero: false
                }),
                new Nodes_1.CallNode({
                    callee: new Nodes_1.LiteralNode('addFields'),
                    parameters: new Nodes_1.OperatorNode({
                        elements: [keyValues],
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
