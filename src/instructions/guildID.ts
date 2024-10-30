import { BaseInstruction, ReturnType } from '@core/BaseInstruction'
import makeIdentifier from '@functions/makeIdentifier'
import makePattern from '@functions/makePattern'
import { LiteralNode } from '@core/Nodes'

/**
 * @name $guildID
 * @description Returns the ID of the current guild.
 * @returns {string}
 */
export default class extends BaseInstruction {
    patterns = makePattern('$guildID')
    description = 'Returns the ID of the current guild.'
    identifier = makeIdentifier(__filename)
    returnType = ReturnType.String
    version = '2.0.0'
    resolve() {
        return new LiteralNode('runtime.guild.id')
    }
}