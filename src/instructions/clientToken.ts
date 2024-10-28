import { BaseInstruction } from '@core/BaseInstruction'
import makeIdentifier from '@functions/makeIdentifier'
import makePattern from '@functions/makePattern'
import { LiteralNode } from '@core/Nodes'

/**
 * @name $clientToken
 * @description Returns the token of the client.
 * @returns {number}
 */
export default class extends BaseInstruction {
    patterns = makePattern('$clientToken')
    identifier = makeIdentifier(__filename)
    resolve() {
        return new LiteralNode('runtime.client.token')
    }
}