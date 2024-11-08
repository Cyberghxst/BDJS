import { BaseInstruction, ReturnType } from '@core/BaseInstruction'
import makeIdentifier from '@functions/makeIdentifier'
import makePattern from '@functions/makePattern'
import { LiteralNode } from '@core/Nodes'

/**
 * @name $readyTimestamp
 * @description Returns the ready timestamp of the client.
 * @returns {number}
 */
export default class extends BaseInstruction {
    patterns = makePattern('$readyTimestamp')
    description = 'Returns the ready timestamp of the client.'
    identifier = makeIdentifier(__filename)
    returnType = ReturnType.Number
    version = '2.0.0'
    resolve() {
        return new LiteralNode('runtime.client.readyTimestamp')
    }
}
