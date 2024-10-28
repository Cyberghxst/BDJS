import { BaseInstruction } from '@core/BaseInstruction'
import makeIdentifier from '@functions/makeIdentifier'
import makePattern from '@functions/makePattern'
import { LiteralNode } from '@core/Nodes'

/**
 * @name $clientName
 * @description Returns the name of the client.
 * @returns {number}
 */
export default class extends BaseInstruction {
    patterns = makePattern('$clientName')
    identifier = makeIdentifier(__filename)
    resolve() {
        return new LiteralNode('runtime.client.user.username')
    }
}