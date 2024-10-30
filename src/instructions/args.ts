import { BaseInstruction, ReturnType } from '@core/BaseInstruction'
import { CallNode, LiteralNode, OperatorNode } from '@core/Nodes'
import makeIdentifier from '@functions/makeIdentifier'
import makePattern from '@functions/makePattern'
import { Transpiler } from '@core/Transpiler'
import { Token } from 'akore'

/**
 * @name $args
 * @description Retrieve the message arguments.
 * @returns {string}
 */
export default class extends BaseInstruction {
    patterns = makePattern('$args', true)
    description = 'Retrieve the message arguments.'
    params = [
        {
            name: 'Arguments',
            description: 'Conditions to validate togheter.',
            type: ReturnType.Unknown,
            required: false,
            spread: false
        }
    ]
    identifier = makeIdentifier(__filename)
    returnType = ReturnType.String
    version = '2.0.0'
    resolve({ inside }: Token<Transpiler>) {
        if (!inside) return new LiteralNode('runtime.args.join(" ")');

        const [index] = this.splitByDelimiter(inside)
        return new CallNode({
            callee: new LiteralNode('runtime.args.at'),
            parameters: new OperatorNode({
                elements: [this.transpiler.resolveNumber(index)],
                operator: ', '
            }),
            zero: false
        })
    }
}