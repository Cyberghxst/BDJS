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
 * @name $charCount
 * @description Returns the character count of a string.
 * @returns {number}
 */
class default_1 extends BaseInstruction_1.BaseInstruction {
    constructor() {
        super(...arguments);
        this.patterns = (0, makePattern_1.default)('$charCount', true);
        this.description = 'Returns the character count of a string.';
        this.params = [
            {
                name: 'Text',
                description: 'The base text to validate.',
                type: BaseInstruction_1.ReturnType.String,
                required: true,
                spread: false
            }
        ];
        this.identifier = (0, makeIdentifier_1.default)(__filename);
        this.returnType = BaseInstruction_1.ReturnType.Number;
        this.version = '2.0.0';
    }
    resolve({ inside = '' }) {
        return new Nodes_1.OperatorNode({
            elements: [
                this.transpiler.resolveString(inside),
                new Nodes_1.LiteralNode('length')
            ],
            operator: '.'
        });
    }
}
exports.default = default_1;
