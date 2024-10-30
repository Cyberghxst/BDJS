import { BaseInstruction, ReturnType } from '@core/BaseInstruction'
import { CallNode, LiteralNode, OperatorNode } from '@core/Nodes'
import makeIdentifier from '@functions/makeIdentifier'
import makePattern from '@functions/makePattern'
import { Transpiler } from '@core/Transpiler'
import { Token } from 'akore'

/**
 * @name $toFixed
 * @description Fixes the decimals of a number.
 * @returns {number}
 */
export default class extends BaseInstruction {
    patterns = makePattern('$toFixed', true)
    description = 'Fixes the decimals of a number.'
    params = [
        {
            name: 'Number',
            description: 'The number to fix.',
            type: ReturnType.Number,
            required: true,
            spread: false
        },
        {
            name: 'Decimals',
            description: 'The amount of decimals.',
            type: ReturnType.Number,
            required: false,
            spread: false
        }
    ]
    identifier = makeIdentifier(__filename)
    returnType = ReturnType.Number
    version = '2.0.0'
    resolve({ inside = '' }: Token<Transpiler>) {
        const [num, decimals] = this.splitByDelimiter(inside)

        return new OperatorNode({
            elements: [
                this.transpiler.resolveNumber(num),
                new CallNode({
                    callee: new LiteralNode('toFixed'),
                    parameters: new OperatorNode({
                        elements: [
                            this.transpiler.resolveNumber(decimals || '2')
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
