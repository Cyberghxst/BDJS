import { BaseInstruction, ReturnType } from '@core/BaseInstruction'
import makeIdentifier from '@functions/makeIdentifier'
import makePattern from '@functions/makePattern'
import { Transpiler } from '@core/Transpiler'
import { OperatorNode } from '@core/Nodes'
import { Token } from 'akore'

/**
 * @name $or
 * @description Executes a JavaScript "or" statement.
 * @returns {boolean}
 */
export default class extends BaseInstruction {
    patterns = makePattern('$or', true)
    description = 'Executes a JavaScript "or" statement.'
    params = [
        {
            name: 'Arguments',
            description: 'Conditions to validate togheter.',
            type: ReturnType.Unknown,
            required: true,
            spread: true
        }
    ]
    identifier = makeIdentifier(__filename)
    returnType = ReturnType.Boolean
    version = '2.0.0'
    resolve({ inside = '' }: Token<Transpiler>) {
        const values = [...this.splitByDelimiter(inside)]

        return new OperatorNode({
            elements: values.map(value => this.transpiler.resolveCondition(value)),
            operator: ' || '
        })
    }
}