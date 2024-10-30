import { BaseInstruction, ReturnType } from '@core/BaseInstruction'
import { LiteralNode, OperatorNode } from '@core/Nodes'
import makeIdentifier from '@functions/makeIdentifier'
import makePattern from '@functions/makePattern'
import { Transpiler } from '@core/Transpiler'
import { Token } from 'akore'

/**
 * @name $toUpperCase
 * @description Converts a string to uppercase.
 * @returns {string}
 */
export default class extends BaseInstruction {
    patterns = makePattern('$toUpperCase', true)
    description = 'Converts a string to uppercase.'
    params = [
        {
            name: 'String',
            description: 'The string to convert.',
            type: ReturnType.String,
            required: true,
            spread: false
        }
    ]
    identifier = makeIdentifier(__filename)
    returnType = ReturnType.String
    version = '2.0.0'
    resolve({ inside = '' }: Token<Transpiler>) {

        return new OperatorNode({
            elements: [
                this.transpiler.resolveString(inside),
                new LiteralNode('toUpperCase()')
            ],
            operator: '.'
        })
    }
}
