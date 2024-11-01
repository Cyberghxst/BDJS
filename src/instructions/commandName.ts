import { BaseInstruction, ReturnType } from '@core/BaseInstruction'
import makeIdentifier from '@functions/makeIdentifier'
import makePattern from '@functions/makePattern'
import { LiteralNode } from '@core/Nodes'

/**
 * @name $commandName
 * @description Returns the current command name.
 * @returns {string}
 */
export default class extends BaseInstruction {
    patterns = makePattern('$commandName')
    description = 'Returns the current command name.'
    identifier = makeIdentifier(__filename)
    returnType = ReturnType.String
    version = '2.0.0'
    resolve() {
        return new LiteralNode('runtime.command.stringifiedName')
    }
}