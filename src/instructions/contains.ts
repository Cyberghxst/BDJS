import { ArrayNode, BaseNode, CallNode, LiteralNode, OperatorNode } from '@core/Nodes'
import { BaseInstruction, ReturnType } from '@core/BaseInstruction'
import makeIdentifier from '@functions/makeIdentifier'
import { type Transpiler } from '@core/Transpiler'
import makePattern from '@functions/makePattern'
import { type Token } from 'akore'

/**
 * @name $contains
 * @description Check if a text contains a value.
 * @returns {boolean}
 */
export default class extends BaseInstruction {
    patterns = makePattern('$contains', true)
    description = 'Check if a text contains a value.'
    params = [
        {
            name: 'Text',
            description: 'The base text to validate.',
            type: ReturnType.String,
            required: true,
            spread: false
        },
        {
            name: 'Value',
            description: 'The value to look for in the base text.',
            type: ReturnType.String,
            required: true,
            spread: false
        }
    ]
    identifier = makeIdentifier(__filename)
    returnType = ReturnType.Boolean
    version = '2.0.0'
    resolve({ inside = '' }: Token<Transpiler>) {
        const [text, value] = this.splitByDelimiter(inside)
        
        return new OperatorNode({
            elements: [
                this.transpiler.resolveString(text),
                new CallNode({
                    callee: new LiteralNode('includes'),
                    parameters: new OperatorNode({
                        elements: [this.transpiler.resolveString(value)],
                        operator: ', '
                    }),
                    zero: false
                })
            ],
            operator: '.'
        })
    }
}