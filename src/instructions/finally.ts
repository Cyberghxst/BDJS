import { BaseInstruction, ReturnType } from '@core/BaseInstruction'
import { BlockNode, LiteralNode, OperatorNode } from '@core/Nodes'
import makeIdentifier from '@functions/makeIdentifier'
import makePattern from '@functions/makePattern'
import { Transpiler } from '@core/Transpiler'
import { Token } from 'akore'

/**
 * @name $finally
 * @description Executes a JavaScript "finally" statement.
 * @returns {unknown}
 */
export default class extends BaseInstruction {
    patterns = makePattern('$finally', true)
    description = 'Executes a JavaScript "finally" statement.'
    params = [
        {
            name: 'Code',
            description: 'Code to execute.',
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
                new LiteralNode('finally'),
                new BlockNode(this.transpiler.bulkNodify(codeTokens))
            ],
            operator: ' '
        })
    }
}