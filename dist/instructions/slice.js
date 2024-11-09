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
 * @name $slice
 * @description Slices a text from x to y.
 * @returns {string}
 */
class default_1 extends BaseInstruction_1.BaseInstruction {
    constructor() {
        super(...arguments);
        this.patterns = (0, makePattern_1.default)('$slice', true);
        this.description = 'Slices a text from x to y.';
        this.params = [
            {
                name: 'Text',
                description: 'The text to slice.',
                type: BaseInstruction_1.ReturnType.String,
                required: true,
                spread: false
            },
            {
                name: 'From',
                description: 'Character index to start slicing.',
                type: BaseInstruction_1.ReturnType.Number,
                required: true,
                spread: false
            },
            {
                name: 'To',
                description: 'Character index to end slicing.',
                type: BaseInstruction_1.ReturnType.Number,
                required: false,
                spread: false
            }
        ];
        this.identifier = (0, makeIdentifier_1.default)(__filename);
        this.returnType = BaseInstruction_1.ReturnType.String;
        this.version = '2.0.0';
    }
    resolve({ inside = '' }) {
        const [text, from, to] = this.splitByDelimiter(inside);
        return new Nodes_1.OperatorNode({
            elements: [
                this.transpiler.resolveString(text),
                new Nodes_1.CallNode({
                    callee: new Nodes_1.LiteralNode('slice'),
                    parameters: new Nodes_1.OperatorNode({
                        elements: [
                            this.transpiler.resolveNumber(from),
                            to ? this.transpiler.resolveNumber(to) : new Nodes_1.LiteralNode('undefined')
                        ],
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
