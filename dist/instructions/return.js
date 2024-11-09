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
 * @name $return
 * @description Returns a value.
 * @returns {string | unknown}
 */
class default_1 extends BaseInstruction_1.BaseInstruction {
    constructor() {
        super(...arguments);
        this.patterns = (0, makePattern_1.default)('$return', true);
        this.description = 'Returns a value.';
        this.params = [
            {
                name: 'Value',
                description: 'The value to return.',
                type: BaseInstruction_1.ReturnType.String,
                required: false,
                spread: false
            }
        ];
        this.identifier = (0, makeIdentifier_1.default)(__filename);
        this.returnType = BaseInstruction_1.ReturnType.String;
        this.version = '2.0.0';
    }
    resolve({ inside }) {
        const nodes = [new Nodes_1.LiteralNode('return')];
        if (inside) {
            nodes.push(this.transpiler.resolveString(inside));
        }
        return new Nodes_1.OperatorNode({
            elements: nodes,
            operator: ' '
        }, true);
    }
}
exports.default = default_1;
