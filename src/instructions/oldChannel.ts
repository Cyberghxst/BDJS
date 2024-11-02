import { BaseInstruction, ReturnType } from '@core/BaseInstruction'
import { LiteralNode, OperatorNode } from '@core/Nodes'
import makeIdentifier from '@functions/makeIdentifier'
import makePattern from '@functions/makePattern'

/**
 * @name $oldChannel
 * @description Retrieves an old channel data.
 * @returns {string}
 */
export default class extends BaseInstruction {
    patterns = makePattern(/\$old(Channel|Thread)/, true)
    description = 'Retrieves an old channel data.'
    params = [
        {
            name: 'Property',
            description: 'Property to be accesed.',
            type: ReturnType.String,
            required: true,
            spread: true
        }
    ]
    identifier = makeIdentifier(__filename)
    returnType = ReturnType.String
    version = '2.0.0'
    resolve({ inside = '' }) {
        const [...properties] = this.splitByDelimiter(inside)
        
        return new OperatorNode({
            elements: [
                new LiteralNode('runtime.states.channel.old'),
                ...properties.map((value) => new LiteralNode(value))
            ],
            operator: '.'
        })
    }
}
