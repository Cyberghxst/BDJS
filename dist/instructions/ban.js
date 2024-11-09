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
 * @name $ban
 * @description Creates an user ban in a guild.
 * @returns {unknown}
 */
class default_1 extends BaseInstruction_1.BaseInstruction {
    constructor() {
        super(...arguments);
        this.patterns = (0, makePattern_1.default)('$ban', true);
        this.description = 'Creates an user ban in a guild.';
        this.params = [
            {
                name: 'Guild ID',
                description: 'The guild to create the ban on.',
                type: BaseInstruction_1.ReturnType.String,
                required: false,
                spread: false
            },
            {
                name: 'Member ID',
                description: 'The member to be banned.',
                type: BaseInstruction_1.ReturnType.String,
                required: true,
                spread: false
            },
            {
                name: 'Delete Message Seconds',
                description: 'The messages to be deleted after the ban, in seconds.',
                type: BaseInstruction_1.ReturnType.Number,
                required: false,
                spread: false
            },
            {
                name: 'Reason',
                description: 'The reason of the ban.',
                type: BaseInstruction_1.ReturnType.String,
                required: false,
                spread: false
            },
        ];
        this.identifier = (0, makeIdentifier_1.default)(__filename);
        this.returnType = BaseInstruction_1.ReturnType.Unknown;
        this.version = '2.0.0';
    }
    resolve({ inside = '' }) {
        const [guildId, memberId, deleteMessageSeconds, reason] = this.splitByDelimiter(inside);
        return new Nodes_1.OperatorNode({
            elements: [
                new Nodes_1.CallNode({
                    callee: new Nodes_1.LiteralNode('runtime.client.guilds.cache.get'),
                    parameters: new Nodes_1.OperatorNode({
                        elements: [this.transpiler.resolveString(guildId || 'ctx.guild.id')],
                        operator: ', '
                    }),
                    zero: false
                }),
                new Nodes_1.CallNode({
                    callee: new Nodes_1.LiteralNode('members.cache.get'),
                    parameters: new Nodes_1.OperatorNode({
                        elements: [this.transpiler.resolveString(memberId)],
                        operator: ', '
                    }),
                    zero: false
                }),
                new Nodes_1.CallNode({
                    callee: new Nodes_1.LiteralNode('ban'),
                    parameters: new Nodes_1.OperatorNode({
                        elements: [
                            new Nodes_1.KeyValueNode([
                                [new Nodes_1.LiteralNode('deleteMessageSeconds'), this.transpiler.resolveNumber(deleteMessageSeconds || '0')],
                                [new Nodes_1.LiteralNode('reason'), reason !== undefined ? this.transpiler.resolveString(reason) : new Nodes_1.LiteralNode('undefined')],
                            ])
                        ],
                        operator: ', '
                    }),
                    zero: false
                }),
            ],
            operator: '.'
        });
    }
}
exports.default = default_1;
