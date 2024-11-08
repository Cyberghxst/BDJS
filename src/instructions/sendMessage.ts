import { BaseInstruction, ReturnType } from '@core/BaseInstruction'
import { AssignmentNode, CallNode, KeyValueNode, LiteralNode, OperatorNode, ProgramNode } from '@core/Nodes'
import makeIdentifier from '@functions/makeIdentifier'
import makePattern from '@functions/makePattern'
import { Transpiler } from '@core/Transpiler'
import { Token } from 'akore'
import createString from '@functions/createString'

/**
 * @name $sendMessage
 * @description Sends a message to the given channel.
 * @returns {unknown}
 */
export default class extends BaseInstruction {
    patterns = makePattern('$sendMessage', true)
    description = 'Sends a message to the given channel.'
    params = [
        {
            name: 'Channel ID',
            description: 'The channel to send the state to.',
            type: ReturnType.String,
            required: true,
            spread: false
        },
        {
            name: 'Content',
            description: 'The content to be sent.',
            type: ReturnType.String,
            required: true,
            spread: false
        },
        {
            name: 'Variable Name',
            description: 'Variable name to load the message ID to.',
            type: ReturnType.String,
            required: false,
            spread: false
        }
    ]
    identifier = makeIdentifier(__filename)
    returnType = ReturnType.Unknown
    version = '2.0.0'
    resolve({ inside = '' }: Token<Transpiler>) {
        let [rawChannelId, rawContent, variableName] = this.splitByDelimiter(inside)

        const program = new ProgramNode([])
        const hash = createString()
        program.push(new LiteralNode(`let message_${hash}`, true))

        const contentTokens = this.transpiler.tokenize(rawContent)
        if (contentTokens.length > 0) {
            program.push(...this.transpiler.bulkNodify(contentTokens))

            for (const matchedToken of contentTokens) {
                let gotValue = matchedToken.match[0]

                if (matchedToken.inside) {
                    gotValue += `[${matchedToken.inside}]`
                }

                rawContent = rawContent.replace(gotValue, '')
            }
        }

        rawContent = rawContent.trim() // Trim the content.
        if (rawContent !== '') {
            program.push(new LiteralNode(`runtime.container.content = ${this.transpiler.resolveString(rawContent).serialize()}`))
        }
        
        program.push(
            new AssignmentNode(
                new LiteralNode(`message_${hash}`),
                new OperatorNode({
                    elements: [
                        new CallNode({
                            callee: new LiteralNode('await runtime.client.channels.cache.get'),
                            parameters: new OperatorNode({
                                elements: [this.transpiler.resolveString(rawChannelId)],
                                operator: ', '
                            }),
                            zero: false
                        }),
                        new CallNode({
                            callee: new LiteralNode('send'),
                            parameters: new OperatorNode({
                                elements: [new LiteralNode('runtime.container')],
                                operator: ', '
                            }),
                            zero: false
                        })
                    ],
                    operator: '.'
                })
            ),
            new LiteralNode('runtime.container.reset()')
        )

        if (variableName) {
            program.push(
                new CallNode({
                    callee: new LiteralNode('runtime.variables.set'),
                    parameters: new OperatorNode({
                        elements: [
                            this.transpiler.resolveString(variableName),
                            new LiteralNode(`message_${hash}.id`)
                        ],
                        operator: ', '
                    }),
                    zero: false
                })
            )
        }

        return program
    }
}