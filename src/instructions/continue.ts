import { BaseInstruction, ReturnType } from '@core/BaseInstruction'
import makeIdentifier from '@functions/makeIdentifier'
import makePattern from '@functions/makePattern'
import { LiteralNode } from '@core/Nodes'

/**
 * @name $continue
 * @description Continues with the next iteration.
 * @returns {unknown}
 */
export default class extends BaseInstruction {
    patterns = makePattern('$continue')
    description = 'Continues with the next iteration.'
    identifier = makeIdentifier(__filename)
    returnType = ReturnType.Unknown
    version = '2.0.0'
    resolve() {
        return new LiteralNode('continue', true)
    }
}
