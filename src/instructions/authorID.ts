import { BaseInstruction, ReturnType } from '@core/BaseInstruction'
import makeIdentifier from '@functions/makeIdentifier'
import makePattern from '@functions/makePattern'
import { LiteralNode } from '@core/Nodes'

/**
 * @name $authorID
 * @description Returns the message author ID.
 * @returns {string}
 */
export default class extends BaseInstruction {
    patterns = makePattern('$authorID')
    description = 'Stops the execution of an iteration.'
    identifier = makeIdentifier(__filename)
    returnType = ReturnType.String
    version = '2.0.0'
    resolve() {
        return new LiteralNode('runtime.user.id')
    }
}
