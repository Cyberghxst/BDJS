import { BlockNode, CallNode, ControlFlowNode, LiteralNode, OperatorNode } from '@core/Nodes'
import { BaseInstruction, ReturnType } from '@core/BaseInstruction'
import makeIdentifier from '@functions/makeIdentifier'
import makePattern from '@functions/makePattern'
import { Transpiler } from '@core/Transpiler'
import { Token } from 'akore'

/**
 * @name $if
 * @description Executes a JavaScript "if" statement.
 * @returns {boolean}
 */
export default class extends BaseInstruction {
    patterns = makePattern('$if', true)
    description = 'Executes a JavaScript "if" statement.'
    params = [
        {
            name: 'Condition',
            description: 'Condition to validate.',
            type: ReturnType.Unknown,
            required: true,
            spread: false
        },
        {
            name: 'Code',
            description: 'Code to execute if the condition is true.',
            type: ReturnType.Unknown,
            required: true,
            spread: false
        }
    ]
    identifier = makeIdentifier(__filename)
    returnType = ReturnType.Boolean
    version = '2.0.0'
    resolve({ inside = '' }: Token<Transpiler>) {
        const [condition, code] = this.splitByDelimiter(inside)
        const codeTokens = [...this.transpiler.lexer.tokenize(code)]

        return new ControlFlowNode({
            indicator: new CallNode({
                callee: new LiteralNode('if'),
                parameters: new OperatorNode({
                    elements: [this.transpiler.resolveCondition(condition)],
                    operator: ''
                }),
                zero: false
            }),
            consequent: [new BlockNode(this.transpiler.bulkNodify(codeTokens))]
        })
    }
}