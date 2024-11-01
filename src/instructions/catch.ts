import { BaseInstruction, ReturnType } from '@core/BaseInstruction'
import { BlockNode, CallNode, ControlFlowNode, LiteralNode, OperatorNode } from '@core/Nodes'
import makeIdentifier from '@functions/makeIdentifier'
import makePattern from '@functions/makePattern'
import { Transpiler } from '@core/Transpiler'
import { Token } from 'akore'

/**
 * @name $catch
 * @description Executes a JavaScript "catch" statement.
 * @returns {unknown}
 */
export default class extends BaseInstruction {
    patterns = makePattern('$catch', true)
    description = 'Executes a JavaScript "catch" statement.'
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
        const [code, variable] = this.splitByDelimiter(inside)
        const codeTokens = [...this.transpiler.lexer.tokenize(code)]

        return new ControlFlowNode({
            indicator: new CallNode({
                callee: new LiteralNode('catch'),
                parameters: new OperatorNode({ elements: [new LiteralNode(variable || 'e')], operator: '' }),
                zero: false
            }),
            consequent: [new BlockNode(this.transpiler.bulkNodify(codeTokens))]
        })
    }
}