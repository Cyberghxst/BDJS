import { BaseInstruction } from '@core/BaseInstruction'
import makeIdentifier from '@functions/makeIdentifier'
import makePattern from '@functions/makePattern'
import { LiteralNode } from '@core/Nodes'

/**
 * @name $clientID
 * @description Returns the ID of the client.
 * @returns {number}
 */
export default class extends BaseInstruction {
    patterns = makePattern('$clientID')
    identifier = makeIdentifier(__filename)
    resolve() {
        return new LiteralNode('runtime.client.user.id')
    }
}