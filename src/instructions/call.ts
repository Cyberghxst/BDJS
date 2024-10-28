import { CallNode, LiteralNode, OperatorNode } from '@core/Nodes'
import { BaseInstruction, ReturnType } from '@core/BaseInstruction'
import makeIdentifier from '@functions/makeIdentifier'
import makePattern from '@functions/makePattern'
import { Transpiler } from '@core/Transpiler'
import { Token } from 'akore'

/**
 * @name $call
 * @description Calls a function from the JavaScript context.
 * @returns {unknown}
 */
export default class extends BaseInstruction {
    patterns = makePattern(/\$([A-z_](\.?[A-z_])*)\*/, true)
    description = 'Calls a function from the JavaScript context.'
    params = [
        {
            name: 'Arguments',
            description: 'Function arguments to be passed to the function.',
            type: ReturnType.Unknown,
            required: false,
            spread: true
        }
    ]
    identifier = makeIdentifier(__filename)
    returnType = ReturnType.Unknown
    version = '2.0.0'
    resolve({ inside, match }: Token<Transpiler>) {
        const tokens = inside ? [...this.transpiler.lexer.tokenize(inside)] : []

        return new CallNode({
            callee: new LiteralNode(match[1]),
            parameters: new OperatorNode({
                elements: this.transpiler.bulkNodify(tokens),
                operator: ', '
            }),
            zero: true
        })
    }
}