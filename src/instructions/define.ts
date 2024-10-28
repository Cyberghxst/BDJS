import { LiteralNode, VariableDeclarationNode, VariableDeclarationType } from '@core/Nodes'
import { BaseInstruction, ReturnType } from '@core/BaseInstruction'
import makeIdentifier from '@functions/makeIdentifier'
import makePattern from '@functions/makePattern'
import { Transpiler } from '@core/Transpiler'
import { Token } from 'akore'

/**
 * @name $define
 * @description Creates a runtime variable.
 * @returns {unknown}
 */
export default class extends BaseInstruction {
    patterns = makePattern('$define', true)
    description = 'Creates a runtime variable.'
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

        return new VariableDeclarationNode(
            VariableDeclarationType.Let,
            new LiteralNode(name),
            new LiteralNode('undefined')
        )
    }
}