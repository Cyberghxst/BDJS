import { BaseInstruction, ReturnType } from '@core/BaseInstruction'
import makeIdentifier from '@functions/makeIdentifier'
import makePattern from '@functions/makePattern'
import { LiteralNode } from '@core/Nodes'

/**
 * @name $ping
 * @description Returns the websocket ping of the client.
 * @returns {number}
 */
export default class extends BaseInstruction {
    patterns = makePattern('$ping')
    description = 'Returns the websocket ping of the client.'
    identifier = makeIdentifier(__filename)
    returnType = ReturnType.Number
    version = '2.0.0'
    resolve() {
        return new LiteralNode('runtime.client.ws.ping')
    }
}