import { BaseInstruction, ReturnType } from '@core/BaseInstruction'
import { CallNode, LiteralNode, OperatorNode } from '@core/Nodes'
import makeIdentifier from '@functions/makeIdentifier'
import { type Transpiler } from '@core/Transpiler'
import makePattern from '@functions/makePattern'
import { type Token } from 'akore'

/**
 * @name $channelType
 * @description Returns the type of the given channel.
 * @returns {number}
 */
export default class extends BaseInstruction {
    patterns = makePattern('$channelType', true)
    description = 'Returns the type of the given channel.'
    params = [
        {
            name: 'Channel ID',
            description: 'The ID of the channel to get the type from.',
            type: ReturnType.String,
            required: false,
            spread: false
        }
    ]
    identifier = makeIdentifier(__filename)
    returnType = ReturnType.Number
    version = '2.0.0'
    resolve({ inside }: Token<Transpiler>) {
        if (!inside) return new LiteralNode('runtime.channel?.type');
        
        const [id] = this.splitByDelimiter(inside)
        return new OperatorNode({
            elements: [
                new CallNode({
                    callee: new LiteralNode('runtime.client.channels.cache.get'),
                    parameters: new OperatorNode({
                        elements: [this.transpiler.resolveString(id)],
                        operator: ', '
                    }),
                    zero: false
                }),
                new LiteralNode('type')
            ],
            operator: '.'
        })
    }
}
