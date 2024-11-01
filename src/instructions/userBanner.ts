import { CallNode, KeyValueNode, LiteralNode, OperatorNode } from '@core/Nodes'
import { BaseInstruction, ReturnType } from '@core/BaseInstruction'
import makeIdentifier from '@functions/makeIdentifier'
import { type Transpiler } from '@core/Transpiler'
import makePattern from '@functions/makePattern'
import { type Token } from 'akore'

/**
 * @name $userBanner
 * @description Returns the banner URL of an user.
 * @returns {string}
 */
export default class extends BaseInstruction {
    patterns = makePattern('$userBanner', true)
    description = 'Returns the banner URL of an user.'
    params = [
        {
            name: 'User ID',
            description: 'The user ID to retrieve the banner from.',
            type: ReturnType.String,
            required: false,
            spread: false
        },
        {
            name: 'Size',
            description: 'The size of the banner.',
            type: ReturnType.Number,
            required: false,
            spread: false
        },
        {
            name: 'Extension',
            description: 'The extension of the image.',
            type: ReturnType.String,
            required: false,
            spread: false
        },
        {
            name: 'Force Static',
            description: 'Whether force the image to be static.',
            type: ReturnType.Boolean,
            required: false,
            spread: false
        }
    ]
    identifier = makeIdentifier(__filename)
    returnType = ReturnType.String
    version = '2.0.0'
    resolve({ inside }: Token<Transpiler>) {
        if (!inside) return new LiteralNode('runtime.user.bannerURL()')

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
                    callee: new LiteralNode('bannerURL'),
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