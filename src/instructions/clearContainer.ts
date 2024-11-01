import { BaseInstruction, ReturnType } from '@core/BaseInstruction'
import makeIdentifier from '@functions/makeIdentifier'
import makePattern from '@functions/makePattern'
import { LiteralNode } from '@core/Nodes'

/**
 * @name $clearContainer
 * @description Forces the container to be cleared.
 * @returns {unknown}
 */
export default class extends BaseInstruction {
    patterns = makePattern('$clearContainer')
    description = 'Forces the container to be cleared.'
    identifier = makeIdentifier(__filename)
    returnType = ReturnType.Unknown
    version = '2.0.0'
    resolve() {
        return new LiteralNode('runtime.container.reset()')
    }
}