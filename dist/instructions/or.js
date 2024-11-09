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
 * @name $or
 * @description Executes a JavaScript "or" statement.
 * @returns {boolean}
 */
class default_1 extends BaseInstruction_1.BaseInstruction {
    constructor() {
        super(...arguments);
        this.patterns = (0, makePattern_1.default)('$or', true);
        this.description = 'Executes a JavaScript "or" statement.';
        this.params = [
            {
                name: 'Arguments',
                description: 'Conditions to validate togheter.',
                type: BaseInstruction_1.ReturnType.Unknown,
                required: true,
                spread: true
            }
        ];
        this.identifier = (0, makeIdentifier_1.default)(__filename);
        this.returnType = BaseInstruction_1.ReturnType.Boolean;
        this.version = '2.0.0';
    }
    resolve({ inside = '' }) {
        const values = [...this.splitByDelimiter(inside)];
        return new Nodes_1.OperatorNode({
            elements: values.map(value => this.transpiler.resolveCondition(value)),
            operator: ' || '
        });
    }
}
exports.default = default_1;
