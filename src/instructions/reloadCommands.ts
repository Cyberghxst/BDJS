import { BaseInstruction, ReturnType } from '@core/BaseInstruction'
import makeIdentifier from '@functions/makeIdentifier'
import makePattern from '@functions/makePattern'
import { LiteralNode } from '@core/Nodes'

/**
 * @name $reloadCommands
 * @description Reload the client commands.
 * @returns {unknown}
 */
export default class extends BaseInstruction {
    patterns = makePattern('$reloadCommands')
    description = 'Reload the client commands.'
    identifier = makeIdentifier(__filename)
    returnType = ReturnType.Boolean
    version = '2.0.0'
    resolve() {
        return new LiteralNode('runtime.client.commands.reload()')
    }
}