import { BaseInstruction, ReturnType } from '@core/BaseInstruction'
import makeIdentifier from '@functions/makeIdentifier'
import makePattern from '@functions/makePattern'
import { Transpiler } from '@core/Transpiler'
import { Token } from 'akore'
import { LiteralNode, OperatorNode } from '@core/Nodes'

/**
 * @name $env
 * @description Returns an environment value.
 * @returns {string}
 */
export default class extends BaseInstruction {
    patterns = makePattern('$env', true)
    description = 'Returns an environment value.'
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
        const [...values] = this.splitByDelimiter(inside)

        return new OperatorNode({
            elements: values.map(value => new LiteralNode(value)),
            operator: '.'
        })
    }
}