import { BaseInstruction, ReturnType } from '@core/BaseInstruction'
import { CallNode, LiteralNode, OperatorNode } from '@core/Nodes'
import makeIdentifier from '@functions/makeIdentifier'
import { type Transpiler } from '@core/Transpiler'
import makePattern from '@functions/makePattern'
import { type Token } from 'akore'

/**
 * @name $slice
 * @description Slices a text from x to y.
 * @returns {string}
 */
export default class extends BaseInstruction {
    patterns = makePattern('$slice', true)
    description = 'Slices a text from x to y.'
    params = [
        {
            name: 'Text',
            description: 'The text to slice.',
            type: ReturnType.String,
            required: true,
            spread: false
        },
        {
            name: 'From',
            description: 'Character index to start slicing.',
            type: ReturnType.Number,
            required: true,
            spread: false
        },
        {
            name: 'To',
            description: 'Character index to end slicing.',
            type: ReturnType.Number,
            required: false,
            spread: false
        }
    ]
    identifier = makeIdentifier(__filename)
    returnType = ReturnType.String
    version = '2.0.0'
    resolve({ inside = '' }: Token<Transpiler>) {
        const [text, from, to] = this.splitByDelimiter(inside)
        
        return new OperatorNode({
            elements: [
                this.transpiler.resolveString(text),
                new CallNode({
                    callee: new LiteralNode('slice'),
                    parameters: new OperatorNode({
                        elements: [
                            this.transpiler.resolveNumber(from),
                            to ? this.transpiler.resolveNumber(to) : new LiteralNode('undefined')
                        ],
                        operator: ', '
                    }),
                    zero: false
                })
            ],
            operator: '.'
        })
    }
}