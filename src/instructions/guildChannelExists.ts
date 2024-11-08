import { BaseInstruction, ReturnType } from '@core/BaseInstruction'
import { CallNode, LiteralNode, OperatorNode } from '@core/Nodes'
import makeIdentifier from '@functions/makeIdentifier'
import { type Transpiler } from '@core/Transpiler'
import makePattern from '@functions/makePattern'
import { type Token } from 'akore'

/**
 * @name $guildChannelExists
 * @description Check whether current or given channel ID exists in the current or given guild.
 * @returns {boolean}
 */
export default class extends BaseInstruction {
    patterns = makePattern('$guildChannelExists', true)
    description = 'Check whether current or given channel ID exists in the current or given guild.'
    params = [
        {
            name: 'Guild ID',
            description: 'The ID of the guild to find the channel in.',
            type: ReturnType.String,
            required: true,
            spread: false
        },
        {
            name: 'Channel ID',
            description: 'The ID of the channel to find.',
            type: ReturnType.String,
            required: true,
            spread: false
        }
    ]
    identifier = makeIdentifier(__filename)
    returnType = ReturnType.Boolean
    version = '2.0.0'
    resolve({ inside = '' }: Token<Transpiler>) {
        const [rawGuildId, rawChannelId] = this.splitByDelimiter(inside)

        return new OperatorNode({
            elements: [
                new LiteralNode('!!'),
                new OperatorNode({
                    elements: [
                        new CallNode({
                            callee: new LiteralNode('runtime.client.guilds.cache.get'),
                            parameters: new OperatorNode({
                                elements: [this.transpiler.resolveString(rawGuildId)],
                                operator: ', '
                            }),
                            zero: false
                        }),
                        new CallNode({
                            callee: new LiteralNode('channels.cache.get'),
                            parameters: new OperatorNode({
                                elements: [this.transpiler.resolveString(rawChannelId)],
                                operator: ', '
                            }),
                            zero: false
                        })
                    ],
                    operator: '.'
                })
            ],
            operator: ''
        })
    }
}
