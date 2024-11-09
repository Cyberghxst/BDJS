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
 * @name $args
 * @description Retrieve the message arguments.
 * @returns {string}
 */
class default_1 extends BaseInstruction_1.BaseInstruction {
    constructor() {
        super(...arguments);
        this.patterns = (0, makePattern_1.default)('$args', true);
        this.description = 'Retrieve the message arguments.';
        this.params = [
            {
                name: 'Arguments',
                description: 'Conditions to validate togheter.',
                type: BaseInstruction_1.ReturnType.Unknown,
                required: false,
                spread: false
            }
        ];
        this.identifier = (0, makeIdentifier_1.default)(__filename);
        this.returnType = BaseInstruction_1.ReturnType.String;
        this.version = '2.0.0';
    }
    resolve({ inside }) {
        if (!inside)
            return new Nodes_1.LiteralNode('runtime.args.join(" ")');
        const [index] = this.splitByDelimiter(inside);
        return new Nodes_1.CallNode({
            callee: new Nodes_1.LiteralNode('runtime.args.at'),
            parameters: new Nodes_1.OperatorNode({
                elements: [this.transpiler.resolveNumber(index)],
                operator: ', '
            }),
            zero: false
        });
    }
}
exports.default = default_1;
