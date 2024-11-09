"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const BaseInstruction_1 = require("../classes/core/BaseInstruction");
const makeIdentifier_1 = __importDefault(require("../utils/functions/makeIdentifier"));
const makePattern_1 = __importDefault(require("../utils/functions/makePattern"));
const Nodes_1 = require("../classes/core/Nodes");
/**
 * @name $mentioned
 * @description Returns the ID of the mentioned user.
 * @returns {string}
 */
class default_1 extends BaseInstruction_1.BaseInstruction {
    constructor() {
        super(...arguments);
        this.patterns = (0, makePattern_1.default)('$mentioned', true);
        this.description = 'Returns the ID of the mentioned user.';
        this.params = [
            {
                name: 'Index',
                description: 'Mention index to get.',
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
        if (!inside)
            return new Nodes_1.LiteralNode('runtime.message?.mentions.members?.first()?.id');
        return new Nodes_1.OperatorNode({
            elements: [
                new Nodes_1.CallNode({
                    callee: new Nodes_1.LiteralNode('runtime.message?.mentions.members?.at'),
                    parameters: new Nodes_1.OperatorNode({
                        elements: [this.transpiler.resolveNumber(inside)],
                        operator: ', '
                    }),
                    zero: false
                }),
                new Nodes_1.LiteralNode('id')
            ],
            operator: '.'
        });
    }
}
exports.default = default_1;
