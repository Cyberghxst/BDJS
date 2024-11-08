import { BaseInstruction, ReturnType } from '@core/BaseInstruction'
import makeIdentifier from '@functions/makeIdentifier'
import makePattern from '@functions/makePattern'
import { LiteralNode } from '@core/Nodes'

/**
 * @name $uptime
 * @description Returns the client uptime.
 * @returns {number}
 */
export default class extends BaseInstruction {
    patterns = makePattern('$uptime')
    description = 'Returns the client uptime.'
    identifier = makeIdentifier(__filename)
    returnType = ReturnType.Number
    version = '2.0.0'
    resolve() {
        return new LiteralNode('runtime.client.uptime')
    }
}
