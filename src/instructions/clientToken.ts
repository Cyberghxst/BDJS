import { BaseInstruction, ReturnType } from '@core/BaseInstruction'
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
    description = 'Returns the token of the client.'
    identifier = makeIdentifier(__filename)
    returnType = ReturnType.String
    version = '2.0.0'
    resolve() {
        return new LiteralNode('runtime.client.token')
    }
}