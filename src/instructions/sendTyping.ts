import { BaseInstruction, ReturnType } from '@core/BaseInstruction'
import { CallNode, LiteralNode, OperatorNode } from '@core/Nodes'
import makeIdentifier from '@functions/makeIdentifier'
import makePattern from '@functions/makePattern'
import { Transpiler } from '@core/Transpiler'
import { Token } from 'akore'

/**
 * @name $sendTyping
 * @description Shows the client as "typing" in the provided channel.
 * @returns {unknown}
 */
export default class extends BaseInstruction {
    patterns = makePattern('$sendTyping', true)
    description = 'Shows the client as "typing" in the provided channel.'
    params = [
        {
            name: 'Channel ID',
            description: 'The channel to send the state to.',
            type: ReturnType.String,
            required: false,
            spread: false
        }
    ]
    identifier = makeIdentifier(__filename)
    returnType = ReturnType.Unknown
    version = '2.0.0'
    resolve({ inside }: Token<Transpiler>) {
        if (!inside) return new LiteralNode('runtime.isSendable() && runtime.channel.sendTyping()');

        const [rawChannelId] = this.splitByDelimiter(inside)
        return new OperatorNode({
            elements: [
                new CallNode({
                    callee: new LiteralNode('runtime.client.channels.cache.get'),
                    parameters: new OperatorNode({
                        elements: [this.transpiler.resolveString(rawChannelId)],
                        operator: ', '
                    }),
                    zero: false
                }),
                new LiteralNode('sendTyping()')
            ],
            operator: '.'
        })
    }
}