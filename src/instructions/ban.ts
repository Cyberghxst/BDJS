import { BaseInstruction, ReturnType } from '@core/BaseInstruction'
import { CallNode, KeyValueNode, LiteralNode, OperatorNode } from '@core/Nodes'
import makeIdentifier from '@functions/makeIdentifier'
import makePattern from '@functions/makePattern'
import { Transpiler } from '@core/Transpiler'
import { Token } from 'akore'

/**
 * @name $ban
 * @description Creates an user ban in a guild.
 * @returns {unknown}
 */
export default class extends BaseInstruction {
    patterns = makePattern('$ban', true)
    description = 'Creates an user ban in a guild.'
    params = [
        {
            name: 'Guild ID',
            description: 'The guild to create the ban on.',
            type: ReturnType.String,
            required: false,
            spread: false
        },
        {
            name: 'Member ID',
            description: 'The member to be banned.',
            type: ReturnType.String,
            required: true,
            spread: false
        },
        {
            name: 'Delete Message Seconds',
            description: 'The messages to be deleted after the ban, in seconds.',
            type: ReturnType.Number,
            required: false,
            spread: false
        },
        {
            name: 'Reason',
            description: 'The reason of the ban.',
            type: ReturnType.String,
            required: false,
            spread: false
        },
    ]
    identifier = makeIdentifier(__filename)
    returnType = ReturnType.Unknown
    version = '2.0.0'
    resolve({ inside = '' }: Token<Transpiler>) {
        const [guildId, memberId, deleteMessageSeconds, reason] = this.splitByDelimiter(inside)

        return new OperatorNode({
            elements: [
                new CallNode({
                    callee: new LiteralNode('runtime.client.guilds.cache.get'),
                    parameters: new OperatorNode({
                        elements: [this.transpiler.resolveString(guildId || 'ctx.guild.id')],
                        operator: ', '
                    }),
                    zero: false
                }),
                new CallNode({
                    callee: new LiteralNode('members.cache.get'),
                    parameters: new OperatorNode({
                        elements: [this.transpiler.resolveString(memberId)],
                        operator: ', '
                    }),
                    zero: false
                }),
                new CallNode({
                    callee: new LiteralNode('ban'),
                    parameters: new OperatorNode({
                        elements: [
                            new KeyValueNode([
                                [new LiteralNode('deleteMessageSeconds'), this.transpiler.resolveNumber(deleteMessageSeconds || '0')],
                                [new LiteralNode('reason'), reason !== undefined ? this.transpiler.resolveString(reason) : new LiteralNode('undefined')],
                            ])
                        ],
                        operator: ', '
                    }),
                    zero: false
                }),
            ],
            operator: '.'
        })
    }
}
