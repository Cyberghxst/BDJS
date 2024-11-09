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
 * @name $voiceID
 * @description Return the voice channel ID the given or current member is in.
 * @returns {string}
 */
class default_1 extends BaseInstruction_1.BaseInstruction {
    constructor() {
        super(...arguments);
        this.patterns = (0, makePattern_1.default)('$voiceID', true);
        this.description = 'Return the voice channel ID the given or current member is in.';
        this.params = [
            {
                name: 'Guild ID',
                description: 'The ID of the guild to find the channel in.',
                type: BaseInstruction_1.ReturnType.String,
                required: false,
                spread: false
            },
            {
                name: 'Member ID',
                description: 'The ID of the member to get.',
                type: BaseInstruction_1.ReturnType.String,
                required: false,
                spread: false
            }
        ];
        this.identifier = (0, makeIdentifier_1.default)(__filename);
        this.returnType = BaseInstruction_1.ReturnType.String;
        this.version = '2.0.0';
    }
    resolve({ inside = '' }) {
        const [rawGuildId, rawMemberId] = this.splitByDelimiter(inside);
        return new Nodes_1.OperatorNode({
            elements: [
                new Nodes_1.CallNode({
                    callee: new Nodes_1.LiteralNode('runtime.client.guilds.cache.get'),
                    parameters: new Nodes_1.OperatorNode({
                        elements: [this.transpiler.resolveString(rawGuildId || 'runtime.guild?.id')],
                        operator: ', '
                    }),
                    zero: false
                }),
                new Nodes_1.CallNode({
                    callee: new Nodes_1.LiteralNode('members.cache.get'),
                    parameters: new Nodes_1.OperatorNode({
                        elements: [this.transpiler.resolveString(rawMemberId || 'runtime.user?.id')],
                        operator: ', '
                    }),
                    zero: false
                }),
                new Nodes_1.LiteralNode('voice.id')
            ],
            operator: '.'
        });
    }
}
exports.default = default_1;
