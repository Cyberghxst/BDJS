import { BaseInstruction, ReturnType } from '@core/BaseInstruction'
import { AssignmentNode, LiteralNode } from '@core/Nodes'
import makeIdentifier from '@functions/makeIdentifier'
import makePattern from '@functions/makePattern'
import { Transpiler } from '@core/Transpiler'
import { Token } from 'akore'

/**
 * @name $setContent
 * @description Set the content of the container.
 * @returns {unknown}
 */
export default class extends BaseInstruction {
    patterns = makePattern('$setContent', true)
    description = 'Set the content of the container.'
    params = [
        {
            name: 'Text',
            description: 'The text to set.',
            type: ReturnType.String,
            required: true,
            spread: false
        }
    ]
    identifier = makeIdentifier(__filename)
    returnType = ReturnType.String
    version = '2.0.0'
    resolve({ inside = '' }: Token<Transpiler>) {
        return new AssignmentNode(
            new LiteralNode('runtime.container.content'),
            this.transpiler.resolveString(inside)
        )
    }
}