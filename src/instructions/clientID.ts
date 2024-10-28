import { BaseInstruction, ReturnType } from '@core/BaseInstruction'
import makeIdentifier from '@functions/makeIdentifier'
import makePattern from '@functions/makePattern'
import { LiteralNode } from '@core/Nodes'

/**
 * @name $clientID
 * @description Returns the ID of the client.
 * @returns {string}
 */
export default class extends BaseInstruction {
    patterns = makePattern('$clientID')
    description = 'Returns the ID of the client.'
    identifier = makeIdentifier(__filename)
    returnType = ReturnType.String
    version = '2.0.0'
    resolve() {
        return new LiteralNode('runtime.client.user.id')
    }
}