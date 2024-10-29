import { BaseInstruction, ReturnType } from '@core/BaseInstruction'
import { CallNode, LiteralNode, OperatorNode } from '@core/Nodes'
import makeIdentifier from '@functions/makeIdentifier'
import makePattern from '@functions/makePattern'
import { Transpiler } from '@core/Transpiler'
import { Token } from 'akore'

/**
 * @name $setGlobalValue
 * @description Set the value of a global runtime variable.
 * @returns {unknown}
 */
export default class extends BaseInstruction {
    patterns = makePattern('$setGlobalValue', true)
    description = 'Set the value of a global runtime variable.'
    params = [
        {
            name: 'Name',
            description: 'The name of the variable.',
            type: ReturnType.String,
            required: true,
            spread: false
        },
        {
            name: 'Value',
            description: 'The value of this variable.',
            type: ReturnType.String,
            required: false,
            spread: false
        }
    ]
    identifier = makeIdentifier(__filename)
    returnType = ReturnType.Unknown
    version = '2.0.0'
    resolve({ inside = '' }: Token<Transpiler>) {
        const [name, value] = this.splitByDelimiter(inside)

        return new CallNode({
            callee: new LiteralNode('runtime.globals.set'),
            parameters: new OperatorNode({
                elements: [
                    this.transpiler.resolveString(name),
                    this.transpiler.resolveString(value)
                ],
                operator: ', '
            }),
            zero: false
        })
    }
}
