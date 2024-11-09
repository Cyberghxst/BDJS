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
 * @name $footer
 * @description Set the embed footer.
 * @returns {unknown}
 */
class default_1 extends BaseInstruction_1.BaseInstruction {
    constructor() {
        super(...arguments);
        this.patterns = (0, makePattern_1.default)('$footer', true);
        this.description = 'Set the embed footer.';
        this.params = [
            {
                name: 'Text',
                description: 'The text to set as footer.',
                type: BaseInstruction_1.ReturnType.String,
                required: true,
                spread: false
            },
            {
                name: 'Icon URL',
                description: 'The URL of the icon to set in footer.',
                type: BaseInstruction_1.ReturnType.String,
                required: true,
                spread: false
            },
            {
                name: 'Index',
                description: 'The embed index to set the footer to.',
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
        const [text, icon, index] = this.splitByDelimiter(inside);
        const keyValues = new Nodes_1.KeyValueNode([[new Nodes_1.LiteralNode('text'), this.transpiler.resolveString(text)]]);
        if (icon) {
            keyValues.push([new Nodes_1.LiteralNode('iconURL'), this.transpiler.resolveString(icon)]);
        }
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
                    callee: new Nodes_1.LiteralNode('setFooter'),
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
