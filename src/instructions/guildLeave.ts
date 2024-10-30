import { BlockNode, CallbackNode, CallNode, LiteralNode, OperatorNode } from '@core/Nodes'
import { BaseInstruction, ReturnType } from '@core/BaseInstruction'
import makeIdentifier from '@functions/makeIdentifier'
import makePattern from '@functions/makePattern'
import { Transpiler } from '@core/Transpiler'
import { Token } from 'akore'

/**
 * @name $guildLeave
 * @description Force the client to leave a guild.
 * @returns {unknown}
 */
export default class extends BaseInstruction {
    patterns = makePattern('$guildLeave', true)
    description = 'Force the client to leave a guild.'
    params = [
        {
            name: 'Guild ID',
            description: 'The guild to leave.',
            type: ReturnType.String,
            required: true,
            spread: false
        },
        {
            name: 'Code',
            description: 'Code to execute if the condition is true.',
            type: ReturnType.Unknown,
            required: true,
            spread: false
        }
    ]
    identifier = makeIdentifier(__filename)
    returnType = ReturnType.Unknown
    version = '2.0.0'
    resolve({ inside = '' }: Token<Transpiler>) {
        const [guildId, then, elsee] = this.splitByDelimiter(inside)
        const thenTokens = [...this.transpiler.lexer.tokenize(then)]
        const elseTokens = [...this.transpiler.lexer.tokenize(elsee)]
        
        return new OperatorNode({
            elements: [
                new CallNode({
                    callee: new LiteralNode('runtime.client.guilds.cache.get'),
                    parameters: new OperatorNode({
                        elements: [this.transpiler.resolveString(guildId)],
                        operator: ', '
                    }),
                    zero: false
                }),
                new LiteralNode('leave()'),
                new CallNode({
                    callee: new LiteralNode('then'),
                    parameters: new OperatorNode({
                        elements: [
                            new CallbackNode({
                                parameters: [new LiteralNode('guild')],
                                consecuent: new BlockNode(this.transpiler.bulkNodify(thenTokens))
                            })
                        ],
                        operator: ', '
                    }),
                    zero: false
                }),
                new CallNode({
                    callee: new LiteralNode('catch'),
                    parameters: new OperatorNode({
                        elements: [
                            new CallbackNode({
                                parameters: [new LiteralNode('err')],
                                consecuent: new BlockNode(this.transpiler.bulkNodify(elseTokens))
                            })
                        ],
                        operator: ', '
                    }),
                    zero: false
                })
            ],
            operator: '.'
        })
    }
}