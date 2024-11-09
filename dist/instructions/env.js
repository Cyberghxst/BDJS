"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const BaseInstruction_1 = require("@core/BaseInstruction");
const makeIdentifier_1 = __importDefault(require("@functions/makeIdentifier"));
const makePattern_1 = __importDefault(require("@functions/makePattern"));
const Nodes_1 = require("@core/Nodes");
/**
 * @name $env
 * @description Returns an environment value.
 * @returns {string}
 */
class default_1 extends BaseInstruction_1.BaseInstruction {
    constructor() {
        super(...arguments);
        this.patterns = (0, makePattern_1.default)('$env', true);
        this.description = 'Returns an environment value.';
        this.params = [
            {
                name: 'Value',
                description: 'The value to return.',
                type: BaseInstruction_1.ReturnType.String,
                required: true,
                spread: true
            }
        ];
        this.identifier = (0, makeIdentifier_1.default)(__filename);
        this.returnType = BaseInstruction_1.ReturnType.String;
        this.version = '2.0.0';
    }
    resolve({ inside = '' }) {
        const [...values] = this.splitByDelimiter(inside);
        return new Nodes_1.OperatorNode({
            elements: values.map(value => new Nodes_1.LiteralNode(value)),
            operator: '.'
        });
    }
}
exports.default = default_1;
