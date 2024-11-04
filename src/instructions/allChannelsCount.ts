import { BaseInstruction, ReturnType } from '@core/BaseInstruction'
import { CallNode, LiteralNode, OperatorNode } from '@core/Nodes'
import makeIdentifier from '@functions/makeIdentifier'
import { type Transpiler } from '@core/Transpiler'
import makePattern from '@functions/makePattern'
import { type Token } from 'akore'

/**
 * @name $allChannelsCount
 * @description Return the count of channels the client is in.
 * @returns {number}
 */
export default class extends BaseInstruction {
    patterns = makePattern('$allChannelsCount', true)
    description = 'Return the count of channels the client is in.'
    params = [
        {
            name: 'Type',
            description: 'The type of channels to filter.',
            type: ReturnType.String,
            required: false,
            spread: false
        }
    ]
    identifier = makeIdentifier(__filename)
    returnType = ReturnType.Number
    version = '2.0.0'
    resolve({ inside }: Token<Transpiler>) {
        if (!inside) return new LiteralNode('runtime.client.channels.cache.size');
        
        const [rawType] = this.splitByDelimiter(inside)
        const type = this.transpiler.resolveString(rawType)

        return new OperatorNode({
            elements: [
                new CallNode({
                    callee: new LiteralNode('runtime.client.channels.cache.filter'),
                    parameters: new OperatorNode({
                        elements: [new LiteralNode(`c => c.type.toString() === ${type.serialize()}`)],
                        operator: ', '
                    }),
                    zero: false
                }),
                new LiteralNode('size')
            ],
            operator: '.'
        })
    }
}
