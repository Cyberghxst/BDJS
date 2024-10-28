import { BaseInstruction, ReturnType } from '@core/BaseInstruction'
import makeIdentifier from '@functions/makeIdentifier'
import makePattern from '@functions/makePattern'
import { LiteralNode } from '@core/Nodes'

/**
 * @name $break
 * @description Stops the execution of an iteration.
 * @returns {unknown}
 */
export default class extends BaseInstruction {
    patterns = makePattern('$break')
    description = 'Stops the execution of an iteration.'
    identifier = makeIdentifier(__filename)
    returnType = ReturnType.Unknown
    version = '2.0.0'
    resolve() {
        return new LiteralNode('break', true)
    }
}
