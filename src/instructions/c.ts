import { BaseInstruction, ReturnType } from '@core/BaseInstruction'
import { BlockNode, LiteralNode, OperatorNode } from '@core/Nodes'
import makeIdentifier from '@functions/makeIdentifier'
import makePattern from '@functions/makePattern'
import { Transpiler } from '@core/Transpiler'
import { Token } from 'akore'

/**
 * @name $c
 * @description Adds a comment to the code.
 * @returns {unknown}
 */
export default class extends BaseInstruction {
    patterns = makePattern('$c', true)
    description = 'Adds a comment to the code.'
    params = [
        {
            name: 'Content',
            description: 'The content of the comment.',
            type: ReturnType.String,
            required: true,
            spread: false
        }
    ]
    identifier = makeIdentifier(__filename)
    returnType = ReturnType.Unknown
    version = '2.0.0'
    resolve({ inside = '' }: Token<Transpiler>) {
        const tokens = [...this.transpiler.lexer.tokenize(inside)]
        const insideNodes = this.transpiler.bulkNodify(tokens)

        if (!/\$[a-zA-Z]/.test(inside)) {
            return new LiteralNode(/\n/.test(inside) ? `/* ${inside} */` : `// ${inside}`)
        } else {
            return new OperatorNode({
                elements: /\n/.test(inside) ? [
                    new LiteralNode('/*'),
                    ...insideNodes,
                    new LiteralNode('*/')
                ] : [
                    new LiteralNode('//'),
                    ...insideNodes
                ],
                operator: ' '
            })
        }
    }
}
