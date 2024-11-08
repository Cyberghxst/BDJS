import { BaseInstruction, ReturnType } from '@core/BaseInstruction'
import { CallNode, LiteralNode, OperatorNode } from '@core/Nodes'
import makeIdentifier from '@functions/makeIdentifier'
import { type Transpiler } from '@core/Transpiler'
import makePattern from '@functions/makePattern'
import { type Token } from 'akore'

/**
 * @name $channelExists
 * @description Check whether current or given channel ID exists.
 * @returns {boolean}
 */
export default class extends BaseInstruction {
    patterns = makePattern('$channelExists', true)
    description = 'Check whether current or given channel ID exists.'
    params = [
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
        const [rawChannelId] = this.splitByDelimiter(inside)

        return new OperatorNode({
            elements: [
                new LiteralNode('!!'),
                new CallNode({
                    callee: new LiteralNode('runtime.client.channels.cache.get'),
                    parameters: new OperatorNode({
                        elements: [this.transpiler.resolveString(rawChannelId)],
                        operator: ', '
                    }),
                    zero: false
                })
            ],
            operator: ''
        })
    }
}
