import { BaseInstruction, ReturnType } from '@core/BaseInstruction'
import { CallNode, LiteralNode, OperatorNode } from '@core/Nodes'
import makeIdentifier from '@functions/makeIdentifier'
import { type Transpiler } from '@core/Transpiler'
import makePattern from '@functions/makePattern'
import { type Token } from 'akore'

/**
 * @name $channelID
 * @description Returns the ID of the current channel.
 * @returns {string}
 */
export default class extends BaseInstruction {
    patterns = makePattern('$channelID', true)
    description = 'Returns the ID of the current channel.'
    params = [
        {
            name: 'Name',
            description: 'The name of the channel to get the ID from.',
            type: ReturnType.String,
            required: false,
            spread: false
        }
    ]
    identifier = makeIdentifier(__filename)
    returnType = ReturnType.String
    version = '2.0.0'
    resolve({ inside }: Token<Transpiler>) {
        if (!inside) return new LiteralNode('runtime.channel?.id');
        
        const [rawName] = this.splitByDelimiter(inside)
        const channelName = this.transpiler.resolveString(rawName)
        
        return new OperatorNode({
            elements: [
                new CallNode({
                    callee: new LiteralNode('runtime.client.channels.cache.get'),
                    parameters: new OperatorNode({
                        elements: [new LiteralNode(`channel => channel.name === ${channelName.serialize()}`)],
                        operator: ', '
                    }),
                    zero: false
                }),
                new LiteralNode('id')
            ],
            operator: '.'
        })
    }
}
