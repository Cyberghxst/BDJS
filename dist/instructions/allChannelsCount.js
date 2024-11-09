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
 * @name $allChannelsCount
 * @description Return the count of channels the client is in.
 * @returns {number}
 */
class default_1 extends BaseInstruction_1.BaseInstruction {
    constructor() {
        super(...arguments);
        this.patterns = (0, makePattern_1.default)('$allChannelsCount', true);
        this.description = 'Return the count of channels the client is in.';
        this.params = [
            {
                name: 'Type',
                description: 'The type of channels to filter.',
                type: BaseInstruction_1.ReturnType.String,
                required: false,
                spread: false
            }
        ];
        this.identifier = (0, makeIdentifier_1.default)(__filename);
        this.returnType = BaseInstruction_1.ReturnType.Number;
        this.version = '2.0.0';
    }
    resolve({ inside }) {
        if (!inside)
            return new Nodes_1.LiteralNode('runtime.client.channels.cache.size');
        const [rawType] = this.splitByDelimiter(inside);
        const type = this.transpiler.resolveString(rawType);
        return new Nodes_1.OperatorNode({
            elements: [
                new Nodes_1.CallNode({
                    callee: new Nodes_1.LiteralNode('runtime.client.channels.cache.filter'),
                    parameters: new Nodes_1.OperatorNode({
                        elements: [new Nodes_1.LiteralNode(`c => c.type.toString() === ${type.serialize()}`)],
                        operator: ', '
                    }),
                    zero: false
                }),
                new Nodes_1.LiteralNode('size')
            ],
            operator: '.'
        });
    }
}
exports.default = default_1;
