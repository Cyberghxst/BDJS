import { BaseInstruction } from '@core/BaseInstruction'
import makeIdentifier from '@functions/makeIdentifier'
import makePattern from '@functions/makePattern'
import { LiteralNode } from '@core/Nodes'

/**
 * @name $ping
 * @description Returns the websocket ping of the client.
 * @returns {number}
 */
export default class extends BaseInstruction {
    patterns = makePattern("$ping")
    identifier = makeIdentifier(this.patterns)
    resolve() {
        return new LiteralNode('ctx.client.ws.ping')
    }
}