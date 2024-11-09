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
 * @name $channelExists
 * @description Check whether current or given channel ID exists.
 * @returns {boolean}
 */
class default_1 extends BaseInstruction_1.BaseInstruction {
    constructor() {
        super(...arguments);
        this.patterns = (0, makePattern_1.default)('$channelExists', true);
        this.description = 'Check whether current or given channel ID exists.';
        this.params = [
            {
                name: 'Channel ID',
                description: 'The ID of the channel to find.',
                type: BaseInstruction_1.ReturnType.String,
                required: true,
                spread: false
            }
        ];
        this.identifier = (0, makeIdentifier_1.default)(__filename);
        this.returnType = BaseInstruction_1.ReturnType.Boolean;
        this.version = '2.0.0';
    }
    resolve({ inside = '' }) {
        const [rawChannelId] = this.splitByDelimiter(inside);
        return new Nodes_1.OperatorNode({
            elements: [
                new Nodes_1.LiteralNode('!!'),
                new Nodes_1.CallNode({
                    callee: new Nodes_1.LiteralNode('runtime.client.channels.cache.get'),
                    parameters: new Nodes_1.OperatorNode({
                        elements: [this.transpiler.resolveString(rawChannelId)],
                        operator: ', '
                    }),
                    zero: false
                })
            ],
            operator: ''
        });
    }
}
exports.default = default_1;
