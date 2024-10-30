import { BaseInstruction, ReturnType } from '@core/BaseInstruction'
import { CallNode, LiteralNode, OperatorNode } from '@core/Nodes'
import makeIdentifier from '@functions/makeIdentifier'
import makePattern from '@functions/makePattern'
import { Transpiler } from '@core/Transpiler'
import { LexicalFlags, Token } from 'akore'

/**
 * @name $log
 * @description Logs a message into the console.
 * @returns {unknown}
 */
export default class extends BaseInstruction {
    patterns = makePattern('$log', true)
    description = 'Logs a message into the console.'
    params = [
        {
            name: 'Message',
            description: 'The message to log in the console.',
            type: ReturnType.Unknown,
            required: true,
            spread: false
        }
    ]
    flags = LexicalFlags.UNSTOPPABLE
    identifier = makeIdentifier(__filename)
    returnType = ReturnType.String
    version = '2.0.0'
    resolve({ inside = '' }: Token<Transpiler>) {
        return new CallNode({
            callee: new LiteralNode('console.log'),
            parameters: new OperatorNode({
                elements: [this.transpiler.resolveString(inside)],
                operator: ', '
            }),
            zero: false
        })
    }
}