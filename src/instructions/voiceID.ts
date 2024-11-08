import { BaseInstruction, ReturnType } from '@core/BaseInstruction'
import { CallNode, LiteralNode, OperatorNode } from '@core/Nodes'
import makeIdentifier from '@functions/makeIdentifier'
import { type Transpiler } from '@core/Transpiler'
import makePattern from '@functions/makePattern'
import { type Token } from 'akore'

/**
 * @name $voiceID
 * @description Return the voice channel ID the given or current member is in.
 * @returns {string}
 */
export default class extends BaseInstruction {
    patterns = makePattern('$voiceID', true)
    description = 'Return the voice channel ID the given or current member is in.'
    params = [
        {
            name: 'Guild ID',
            description: 'The ID of the guild to find the channel in.',
            type: ReturnType.String,
            required: false,
            spread: false
        },
        {
            name: 'Member ID',
            description: 'The ID of the member to get.',
            type: ReturnType.String,
            required: false,
            spread: false
        }
    ]
    identifier = makeIdentifier(__filename)
    returnType = ReturnType.String
    version = '2.0.0'
    resolve({ inside = '' }: Token<Transpiler>) {
        const [rawGuildId, rawMemberId] = this.splitByDelimiter(inside)

        return new OperatorNode({
            elements: [
                new CallNode({
                    callee: new LiteralNode('runtime.client.guilds.cache.get'),
                    parameters: new OperatorNode({
                        elements: [this.transpiler.resolveString(rawGuildId || 'runtime.guild?.id')],
                        operator: ', '
                    }),
                    zero: false
                }),
                new CallNode({
                    callee: new LiteralNode('members.cache.get'),
                    parameters: new OperatorNode({
                        elements: [this.transpiler.resolveString(rawMemberId || 'runtime.user?.id')],
                        operator: ', '
                    }),
                    zero: false
                }),
                new LiteralNode('voice.id')
            ],
            operator: '.'
        })
    }
}
