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
 * @name $setGlobalValue
 * @description Set the value of a global runtime variable.
 * @returns {unknown}
 */
class default_1 extends BaseInstruction_1.BaseInstruction {
    constructor() {
        super(...arguments);
        this.patterns = (0, makePattern_1.default)('$setGlobalValue', true);
        this.description = 'Set the value of a global runtime variable.';
        this.params = [
            {
                name: 'Name',
                description: 'The name of the variable.',
                type: BaseInstruction_1.ReturnType.String,
                required: true,
                spread: false
            },
            {
                name: 'Value',
                description: 'The value of this variable.',
                type: BaseInstruction_1.ReturnType.String,
                required: false,
                spread: false
            }
        ];
        this.identifier = (0, makeIdentifier_1.default)(__filename);
        this.returnType = BaseInstruction_1.ReturnType.Unknown;
        this.version = '2.0.0';
    }
    resolve({ inside = '' }) {
        const [name, value] = this.splitByDelimiter(inside);
        return new Nodes_1.CallNode({
            callee: new Nodes_1.LiteralNode('runtime.globals.set'),
            parameters: new Nodes_1.OperatorNode({
                elements: [
                    this.transpiler.resolveString(name),
                    this.transpiler.resolveString(value)
                ],
                operator: ', '
            }),
            zero: false
        });
    }
}
exports.default = default_1;