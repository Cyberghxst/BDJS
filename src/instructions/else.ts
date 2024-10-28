import { BaseInstruction, ReturnType } from '@core/BaseInstruction'
import { BlockNode, LiteralNode, OperatorNode } from '@core/Nodes'
import makeIdentifier from '@functions/makeIdentifier'
import makePattern from '@functions/makePattern'
import { Transpiler } from '@core/Transpiler'
import { Token } from 'akore'

/**
 * @name $else
 * @description Executes a JavaScript "else" statement.
 * @returns {unknown}
 */
export default class extends BaseInstruction {
    patterns = makePattern('$else', true)
    description = 'Executes a JavaScript "else" statement.'
    params = [
        {
            name: 'Code',
            description: 'Code to execute if the condition is true.',
            type: ReturnType.Unknown,
            required: true,
            spread: false
        }
    ]
    identifier = makeIdentifier(__filename)
    returnType = ReturnType.Unknown
    version = '2.0.0'
    resolve({ inside = '' }: Token<Transpiler>) {
        const [code] = this.splitByDelimiter(inside)
        const codeTokens = [...this.transpiler.lexer.tokenize(code)]

        return new OperatorNode({
            elements: [
                new LiteralNode('else'),
                new BlockNode(this.transpiler.bulkNodify(codeTokens))
            ],
            operator: ' '
        })
    }
}