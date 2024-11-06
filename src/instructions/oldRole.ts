import { BaseInstruction, ReturnType } from '@core/BaseInstruction'
import { LiteralNode, OperatorNode } from '@core/Nodes'
import makeIdentifier from '@functions/makeIdentifier'
import makePattern from '@functions/makePattern'

/**
 * @name $oldRole
 * @description Retrieves an old role data.
 * @returns {string}
 */
export default class extends BaseInstruction {
    patterns = makePattern('$oldRole', true)
    description = 'Retrieves an old role data.'
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
                new LiteralNode('runtime.states.role.old'),
                ...properties.map((value) => new LiteralNode(value))
            ],
            operator: '.'
        })
    }
}