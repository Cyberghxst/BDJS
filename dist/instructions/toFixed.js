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
 * @name $toFixed
 * @description Fixes the decimals of a number.
 * @returns {number}
 */
class default_1 extends BaseInstruction_1.BaseInstruction {
    constructor() {
        super(...arguments);
        this.patterns = (0, makePattern_1.default)('$toFixed', true);
        this.description = 'Fixes the decimals of a number.';
        this.params = [
            {
                name: 'Number',
                description: 'The number to fix.',
                type: BaseInstruction_1.ReturnType.Number,
                required: true,
                spread: false
            },
            {
                name: 'Decimals',
                description: 'The amount of decimals.',
                type: BaseInstruction_1.ReturnType.Number,
                required: false,
                spread: false
            }
        ];
        this.identifier = (0, makeIdentifier_1.default)(__filename);
        this.returnType = BaseInstruction_1.ReturnType.Number;
        this.version = '2.0.0';
    }
    resolve({ inside = '' }) {
        const [num, decimals] = this.splitByDelimiter(inside);
        return new Nodes_1.OperatorNode({
            elements: [
                this.transpiler.resolveNumber(num),
                new Nodes_1.CallNode({
                    callee: new Nodes_1.LiteralNode('toFixed'),
                    parameters: new Nodes_1.OperatorNode({
                        elements: [
                            this.transpiler.resolveNumber(decimals || '2')
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
