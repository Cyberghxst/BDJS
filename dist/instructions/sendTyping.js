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
 * @name $sendTyping
 * @description Shows the client as "typing" in the provided channel.
 * @returns {unknown}
 */
class default_1 extends BaseInstruction_1.BaseInstruction {
    constructor() {
        super(...arguments);
        this.patterns = (0, makePattern_1.default)('$sendTyping', true);
        this.description = 'Shows the client as "typing" in the provided channel.';
        this.params = [
            {
                name: 'Channel ID',
                description: 'The channel to send the state to.',
                type: BaseInstruction_1.ReturnType.String,
                required: false,
                spread: false
            }
        ];
        this.identifier = (0, makeIdentifier_1.default)(__filename);
        this.returnType = BaseInstruction_1.ReturnType.Unknown;
        this.version = '2.0.0';
    }
    resolve({ inside }) {
        if (!inside)
            return new Nodes_1.LiteralNode('runtime.isSendable() && runtime.channel.sendTyping()');
        const [rawChannelId] = this.splitByDelimiter(inside);
        return new Nodes_1.OperatorNode({
            elements: [
                new Nodes_1.CallNode({
                    callee: new Nodes_1.LiteralNode('runtime.client.channels.cache.get'),
                    parameters: new Nodes_1.OperatorNode({
                        elements: [this.transpiler.resolveString(rawChannelId)],
                        operator: ', '
                    }),
                    zero: false
                }),
                new Nodes_1.LiteralNode('sendTyping()')
            ],
            operator: '.'
        });
    }
}
exports.default = default_1;
