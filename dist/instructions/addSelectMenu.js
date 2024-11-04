"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Nodes_1 = require("../classes/core/Nodes");
const BaseInstruction_1 = require("../classes/core/BaseInstruction");
const makeIdentifier_1 = __importDefault(require("../utils/functions/makeIdentifier"));
const makePattern_1 = __importDefault(require("../utils/functions/makePattern"));
const ensureFields_1 = __importDefault(require("../utils/functions/ensureFields"));
/**
 * @name $addSelectMenu
 * @description Adds a select menu to the container.
 * @returns {unknown}
 */
class default_1 extends BaseInstruction_1.BaseInstruction {
    constructor() {
        super(...arguments);
        this.patterns = (0, makePattern_1.default)('$addSelectMenu', true);
        this.description = 'Adds a select menu to the container.';
        this.params = [
            {
                name: 'Type',
                description: 'The type of select menu to be added.',
                type: BaseInstruction_1.ReturnType.String,
                required: true,
                spread: false
            },
            {
                name: 'Custom ID',
                description: 'Custom ID to identify this select menu.',
                type: BaseInstruction_1.ReturnType.String,
                required: true,
                spread: false
            },
            {
                name: 'Placeholder',
                description: 'The placeholder of this select menu.',
                type: BaseInstruction_1.ReturnType.String,
                required: false,
                spread: false
            },
            {
                name: 'Disabled',
                description: 'Whether this select menu should be disabled.',
                type: BaseInstruction_1.ReturnType.Boolean,
                required: false,
                spread: false
            },
            {
                name: 'Minimum Values',
                description: 'The minimum values for this menu to be selected.',
                type: BaseInstruction_1.ReturnType.Number,
                required: false,
                spread: false
            },
            {
                name: 'Maximum Values',
                description: 'The maximum values for this menu to be selected.',
                type: BaseInstruction_1.ReturnType.Number,
                required: false,
                spread: false
            },
            {
                name: 'Index',
                description: 'Action row index to attach this select menu to.',
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
        const values = [...this.splitByDelimiter(inside)];
        const [type, customId, placeholder, disabled, minValues, maxValues, index] = values;
        (0, ensureFields_1.default)(this.params, values, this.identifier);
        const args = [
            this.transpiler.resolveString(type),
            this.transpiler.resolveString(customId)
        ];
        if (placeholder)
            args.push(this.transpiler.resolveString(placeholder));
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
        if (minValues)
            args.push(this.transpiler.resolveNumber(minValues));
        if (maxValues)
            args.push(this.transpiler.resolveNumber(maxValues));
        return new Nodes_1.CallNode({
            callee: new Nodes_1.LiteralNode('runtime.container.addSelectMenu'),
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
