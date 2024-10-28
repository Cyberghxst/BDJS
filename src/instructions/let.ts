import { BaseInstruction, ReturnType } from '@core/BaseInstruction'
import { AssignmentNode, LiteralNode } from '@core/Nodes'
import makeIdentifier from '@functions/makeIdentifier'
import makePattern from '@functions/makePattern'
import { Transpiler } from '@core/Transpiler'
import { Token } from 'akore'

/**
 * @name $let
 * @description Creates a runtime variable.
 * @returns {unknown}
 */
export default class extends BaseInstruction {
    patterns = makePattern('$let', true)
    description = 'Creates a runtime variable.'
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

        return new AssignmentNode(
            new LiteralNode(name),
            this.transpiler.resolveString(value)
        )
    }
}