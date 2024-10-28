import { BaseInstruction, ReturnType } from '@core/BaseInstruction'
import { AssignmentNode, LiteralNode } from '@core/Nodes'
import makeIdentifier from '@functions/makeIdentifier'
import makePattern from '@functions/makePattern'
import { Transpiler } from '@core/Transpiler'
import { Token } from 'akore'

/**
 * @name $get
 * @description Retrieves the value of a runtime variable.
 * @returns {string}
 */
export default class extends BaseInstruction {
    patterns = makePattern('$get', true)
    description = 'Retrieves the value of a runtime variable.'
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
    returnType = ReturnType.String
    version = '2.0.0'
    resolve({ inside = '' }: Token<Transpiler>) {
        const [name] = this.splitByDelimiter(inside)

        return new LiteralNode(name)
    }
}