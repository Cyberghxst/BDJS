import { BaseInstruction, ReturnType } from '@core/BaseInstruction'
import { CallNode, LiteralNode, OperatorNode } from '@core/Nodes'
import makeIdentifier from '@functions/makeIdentifier'
import { type Transpiler } from '@core/Transpiler'
import makePattern from '@functions/makePattern'
import { type Token } from 'akore'

/**
 * @name $channelName
 * @description Returns the name of the current channel.
 * @returns {string}
 */
export default class extends BaseInstruction {
    patterns = makePattern('$channelName', true)
    description = 'Returns the name of the current channel.'
    params = [
        {
            name: 'Channel ID',
            description: 'The ID of the channel to get the name from.',
            type: ReturnType.String,
            required: false,
            spread: false
        }
    ]
    identifier = makeIdentifier(__filename)
    returnType = ReturnType.String
    version = '2.0.0'
    resolve({ inside }: Token<Transpiler>) {
        if (!inside) return new LiteralNode('runtime.channel?.name');
        
        const [id] = this.splitByDelimiter(inside)
        return new CallNode({
            callee: new LiteralNode('runtime.client.channels.cache.get'),
            parameters: new OperatorNode({
                elements: [this.transpiler.resolveString(id)],
                operator: ', '
            }),
            zero: false
        })
    }
}
