import { BaseNode, BlockNode, CallNode, KeyValueNode, LiteralNode, OperatorNode } from '@core/Nodes'
import { BaseInstruction } from '@core/BaseInstruction'
import makeIdentifier from '@functions/makeIdentifier'
import { type Transpiler } from '@core/Transpiler'
import makePattern from '@functions/makePattern'
import { type Token } from 'akore'

/**
 * @name $userAvatar
 * @description Returns the token of the client.
 * @returns {number}
 */
export default class extends BaseInstruction {
    patterns = makePattern('$userAvatar', true)
    identifier = makeIdentifier(__filename)
    resolve({ inside }: Token<Transpiler>) {
        if (!inside) {
            return new CallNode({
                callee: new LiteralNode('runtime.user.displayAvatarURL'),
                parameters: new OperatorNode({
                    elements: [
                        new KeyValueNode([
                            [new LiteralNode('forceStatic'), new LiteralNode('true')],
                            [new LiteralNode('size'), new LiteralNode('1024')],
                            [new LiteralNode('format'), this.transpiler.resolveString('png')]
                        ])
                    ],
                    operator: ''
                }),
                zero: false
            })
        }

        const [userId, size, extension, forceStatic] = this.splitByDelimiter(inside)

        return new OperatorNode({
            elements: [
                new CallNode({
                    callee: new LiteralNode('runtime.client.users.cache.get'),
                    parameters: new OperatorNode({
                        elements: [this.transpiler.resolveString(userId)],
                        operator: ''
                    }),
                    zero: false
                }),
                new CallNode({
                    callee: new LiteralNode('displayAvatarURL'),
                    parameters: new OperatorNode({
                        elements: [
                            new KeyValueNode([
                                [new LiteralNode('forceStatic'), new LiteralNode(forceStatic !== undefined ? forceStatic : 'true')],
                                [new LiteralNode('size'), this.transpiler.resolveNumber(size || '1024')],
                                [new LiteralNode('format'), this.transpiler.resolveString(extension || 'png')]
                            ])
                        ],
                        operator: ''
                    }),
                    zero: false
                })
            ],
            operator: '.'
        })
    }
}