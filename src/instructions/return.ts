import { BaseInstruction, ReturnType } from '@core/BaseInstruction'
import { BaseNode, LiteralNode, OperatorNode } from '@core/Nodes'
import makeIdentifier from '@functions/makeIdentifier'
import makePattern from '@functions/makePattern'
import { Transpiler } from '@core/Transpiler'
import { Token } from 'akore'

/**
 * @name $return
 * @description Returns a value.
 * @returns {string | unknown}
 */
export default class extends BaseInstruction {
    patterns = makePattern('$return', true)
    description = 'Returns a value.'
    params = [
        {
            name: 'Value',
            description: 'The value to return.',
            type: ReturnType.String,
            required: true,
            spread: true
        }
    ]
    identifier = makeIdentifier(__filename)
    returnType = ReturnType.String
    version = '2.0.0'
    resolve({ inside = '' }: Token<Transpiler>) {
        const nodes: BaseNode[] = [new LiteralNode('return')]

        if (inside) {
            nodes.push(this.transpiler.resolveString(inside))
        }

        return new OperatorNode({
            elements: nodes,
            operator: ' '
        }, true)
    }
}