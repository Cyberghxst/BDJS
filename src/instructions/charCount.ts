import { BaseInstruction, ReturnType } from '@core/BaseInstruction'
import { CallNode, LiteralNode, OperatorNode } from '@core/Nodes'
import makeIdentifier from '@functions/makeIdentifier'
import { type Transpiler } from '@core/Transpiler'
import makePattern from '@functions/makePattern'
import { type Token } from 'akore'

/**
 * @name $charCount
 * @description Returns the character count of a string.
 * @returns {number}
 */
export default class extends BaseInstruction {
    patterns = makePattern('$charCount', true)
    description = 'Returns the character count of a string.'
    params = [
        {
            name: 'Text',
            description: 'The base text to validate.',
            type: ReturnType.String,
            required: true,
            spread: false
        }
    ]
    identifier = makeIdentifier(__filename)
    returnType = ReturnType.Number
    version = '2.0.0'
    resolve({ inside = '' }: Token<Transpiler>) {
        return new OperatorNode({
            elements: [
                this.transpiler.resolveString(inside),
                new LiteralNode('length')
            ],
            operator: '.'
        })
    }
}