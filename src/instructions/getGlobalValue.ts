import { BaseInstruction, ReturnType } from '@core/BaseInstruction'
import { CallNode, LiteralNode, OperatorNode } from '@core/Nodes'
import makeIdentifier from '@functions/makeIdentifier'
import makePattern from '@functions/makePattern'
import { Transpiler } from '@core/Transpiler'
import { Token } from 'akore'

/**
 * @name $getGlobalValue
 * @description Get a global runtime variable.
 * @returns {unknown}
 */
export default class extends BaseInstruction {
    patterns = makePattern('$getGlobalValue', true)
    description = 'Get a global runtime variable.'
    params = [
        {
            name: 'Name',
            description: 'The name of the variable.',
            type: ReturnType.String,
            required: true,
            spread: false
        }
    ]
    identifier = makeIdentifier(__filename)
    returnType = ReturnType.Unknown
    version = '2.0.0'
    resolve({ inside = '' }: Token<Transpiler>) {
        const [name] = this.splitByDelimiter(inside)

        return new CallNode({
            callee: new LiteralNode('runtime.globals.get'),
            parameters: new OperatorNode({
                elements: [
                    this.transpiler.resolveString(name)
                ],
                operator: ', '
            }),
            zero: false
        })
    }
}
