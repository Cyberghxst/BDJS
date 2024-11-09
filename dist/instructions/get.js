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
 * @name $get
 * @description Retrieves the value of a runtime variable.
 * @returns {string}
 */
class default_1 extends BaseInstruction_1.BaseInstruction {
    constructor() {
        super(...arguments);
        this.patterns = (0, makePattern_1.default)('$get', true);
        this.description = 'Retrieves the value of a runtime variable.';
        this.params = [
            {
                name: 'Name',
                description: 'The name of the variable.',
                type: BaseInstruction_1.ReturnType.String,
                required: true,
                spread: false
            }
        ];
        this.identifier = (0, makeIdentifier_1.default)(__filename);
        this.returnType = BaseInstruction_1.ReturnType.String;
        this.version = '2.0.0';
    }
    resolve({ inside = '' }) {
        const [name] = this.splitByDelimiter(inside);
        return new Nodes_1.CallNode({
            callee: new Nodes_1.LiteralNode('runtime.variables.get'),
            parameters: new Nodes_1.OperatorNode({
                elements: [
                    this.transpiler.resolveString(name)
                ],
                operator: ', '
            }),
            zero: false
        });
    }
}
exports.default = default_1;
