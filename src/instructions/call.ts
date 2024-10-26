import { CallNode, LiteralNode, OperatorNode } from '@core/Nodes'
import { BaseInstruction } from '@core/BaseInstruction'
import makeIdentifier from '@functions/makeIdentifier'
import makePattern from '@functions/makePattern'
import { Transpiler } from '@core/Transpiler'
import { Token } from 'akore'

/**
 * @name $call
 * @description Calls a function from the JavaScript context.
 * @returns {number}
 */
export default class extends BaseInstruction {
    patterns = makePattern(/\$([A-z_](\.?[A-z_])*)\*/, true)
    identifier = makeIdentifier(this.patterns)
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