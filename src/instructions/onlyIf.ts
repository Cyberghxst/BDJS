import { BlockNode, CallNode, ControlFlowNode, LiteralNode, OperatorNode } from '@core/Nodes'
import { BaseInstruction, ReturnType } from '@core/BaseInstruction'
import makeIdentifier from '@functions/makeIdentifier'
import makePattern from '@functions/makePattern'
import { Transpiler } from '@core/Transpiler'
import { Token } from 'akore'

/**
 * @name $onlyIf
 * @description Execute an error code if the condition is not met.
 * @returns {unknown}
 */
export default class extends BaseInstruction {
    patterns = makePattern('$onlyIf', true)
    description = 'Execute an error code if the condition is not met.'
    params = [
        {
            name: 'Condition',
            description: 'Condition to validate.',
            type: ReturnType.Unknown,
            required: true,
            spread: false
        },
        {
            name: 'Error Code',
            description: 'Code to execute if the condition is not true.',
            type: ReturnType.String,
            required: false,
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
                    elements: [new LiteralNode(`!(${this.transpiler.resolveCondition(condition).serialize()})`)],
                    operator: ''
                }),
                zero: false
            }),
            consequent: [
                new BlockNode([
                    ...this.transpiler.bulkNodify(codeTokens),
                    new LiteralNode('return;')
                ]),
            ]
        })
    }
}