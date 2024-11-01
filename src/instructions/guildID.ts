import { BaseInstruction, ReturnType } from '@core/BaseInstruction'
import { CallNode, LiteralNode, OperatorNode } from '@core/Nodes'
import makeIdentifier from '@functions/makeIdentifier'
import { type Transpiler } from '@core/Transpiler'
import makePattern from '@functions/makePattern'
import { type Token } from 'akore'

/**
 * @name $guildID
 * @description Returns the ID of the current guild.
 * @returns {string}
 */
export default class extends BaseInstruction {
    patterns = makePattern('$guildID', true)
    description = 'Returns the ID of the current guild.'
    params = [
        {
            name: 'Name',
            description: 'The name of the channel to get the ID from.',
            type: ReturnType.String,
            required: false,
            spread: false
        }
    ]
    identifier = makeIdentifier(__filename)
    returnType = ReturnType.String
    version = '2.0.0'
    resolve({ inside }: Token<Transpiler>) {
        if (!inside) return new LiteralNode('runtime.guild?.id');

        const [rawGuildName] = this.splitByDelimiter(inside)
        const guildName = this.transpiler.resolveString(rawGuildName)
        
        return new OperatorNode({
            elements: [
                new CallNode({
                    callee: new LiteralNode('runtime.client.guilds.cache.get'),
                    parameters: new OperatorNode({
                        elements: [new LiteralNode(`g => g.name === ${guildName.serialize()}`)],
                        operator: ', '
                    }),
                    zero: false
                }),
                new LiteralNode('id')
            ],
            operator: '.'
        })
    }
}