import { BaseInstruction, ReturnType } from '@core/BaseInstruction'
import { CallNode, LiteralNode, OperatorNode } from '@core/Nodes'
import makeIdentifier from '@functions/makeIdentifier'
import { type Transpiler } from '@core/Transpiler'
import makePattern from '@functions/makePattern'
import { type Token } from 'akore'

/**
 * @name $guildAvailable
 * @description Return whether the current or given guild is available.
 * @returns {boolean}
 */
export default class extends BaseInstruction {
    patterns = makePattern('$guildAvailable', true)
    description = 'Return whether the current or given guild is available.'
    params = [
        {
            name: 'Guild ID',
            description: 'The ID of the guild to get.',
            type: ReturnType.String,
            required: false,
            spread: false
        }
    ]
    identifier = makeIdentifier(__filename)
    returnType = ReturnType.Boolean
    version = '2.0.0'
    resolve({ inside }: Token<Transpiler>) {
        if (!inside) return new LiteralNode('runtime.guild?.available');
        
        const [rawGuildName] = this.splitByDelimiter(inside)

        return new OperatorNode({
            elements: [
                new CallNode({
                    callee: new LiteralNode('runtime.client.guilds.cache.get'),
                    parameters: new OperatorNode({
                        elements: [this.transpiler.resolveString(rawGuildName)],
                        operator: ', '
                    }),
                    zero: false
                }),
                new LiteralNode('available')
            ],
            operator: '.'
        })
    }
}
