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
 * @name $addButton
 * @description Adds a button to the container.
 * @returns {unknown}
 */
class default_1 extends BaseInstruction_1.BaseInstruction {
    constructor() {
        super(...arguments);
        this.patterns = (0, makePattern_1.default)('$addButton', true);
        this.description = 'Adds a button to the container.';
        this.params = [
            {
                name: 'Custom ID',
                description: 'Custom ID, Link or SKU ID to identify this button.',
                type: BaseInstruction_1.ReturnType.String,
                required: true,
                spread: false
            },
            {
                name: 'Style',
                description: 'The style of this button.',
                type: BaseInstruction_1.ReturnType.String,
                required: true,
                spread: false
            },
            {
                name: 'Label',
                description: 'The label of this button.',
                type: BaseInstruction_1.ReturnType.String,
                required: false,
                spread: false
            },
            {
                name: 'Emoji',
                description: 'The emoji of this button.',
                type: BaseInstruction_1.ReturnType.String,
                required: false,
                spread: false
            },
            {
                name: 'Disabled',
                description: 'Whether this button should be disabled.',
                type: BaseInstruction_1.ReturnType.Boolean,
                required: false,
                spread: false
            },
            {
                name: 'Index',
                description: 'Action row index to attach this button to.',
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
        const [customId, style, label, emoji, disabled, index] = this.splitByDelimiter(inside);
        const args = [
            this.transpiler.resolveString(customId),
            this.transpiler.resolveString(style)
        ];
        if (label)
            args.push(this.transpiler.resolveString(label));
        if (emoji)
            args.push(this.transpiler.resolveString(emoji));
        if (disabled) {
            const value = this.transpiler.lexer.tokenize(disabled);
            if (value.next().value === undefined) {
                args.push(new Nodes_1.LiteralNode(disabled));
            }
            else {
                args.push(new Nodes_1.CallNode({
                    callee: new Nodes_1.LiteralNode('Boolean'),
                    parameters: new Nodes_1.OperatorNode({
                        elements: [this.transpiler.resolveString(disabled)],
                        operator: ', '
                    }),
                    zero: false
                }));
            }
        }
        return new Nodes_1.CallNode({
            callee: new Nodes_1.LiteralNode('runtime.container.addButton'),
            parameters: new Nodes_1.OperatorNode({
                elements: [
                    new Nodes_1.ArrayNode(args, false),
                    index !== undefined ? this.transpiler.resolveNumber(index) : new Nodes_1.LiteralNode('undefined')
                ],
                operator: ', '
            }),
            zero: false
        });
    }
}
exports.default = default_1;
