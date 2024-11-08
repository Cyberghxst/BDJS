import { BaseInstruction, ReturnType } from '@core/BaseInstruction'
import makeIdentifier from '@functions/makeIdentifier'
import makePattern from '@functions/makePattern'
import { LiteralNode } from '@core/Nodes'

/**
 * @name $messageID
 * @description Returns the type of the message.
 * @returns {string}
 */
export default class extends BaseInstruction {
    patterns = makePattern('$messageType')
    description = 'Returns the type of the message.'
    identifier = makeIdentifier(__filename)
    returnType = ReturnType.String
    version = '2.0.0'
    resolve() {
        return new LiteralNode('runtime.message?.type')
    }
}
