import { BaseInstruction, ReturnType } from '@core/BaseInstruction'
import { CallNode, LiteralNode, OperatorNode } from '@core/Nodes'
import makeIdentifier from '@functions/makeIdentifier'
import { type Transpiler } from '@core/Transpiler'
import makePattern from '@functions/makePattern'
import { type Token } from 'akore'

/**
 * @name $userAccentColor
 * @description Returns the accent color of an user.
 * @returns {string}
 */
export default class extends BaseInstruction {
    patterns = makePattern('$userAccentColor', true)
    description = 'Returns the accent color of an user.'
    params = [
        {
            name: 'User ID',
            description: 'The user ID to retrieve the avatar from.',
            type: ReturnType.String,
            required: false,
            spread: false
        }
    ]
    identifier = makeIdentifier(__filename)
    returnType = ReturnType.String
    version = '2.0.0'
    resolve({ inside }: Token<Transpiler>) {
        if (!inside) new LiteralNode('runtime.user.hexAccentColor')

        const [userId] = this.splitByDelimiter(inside)

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
                new LiteralNode('hexAccentColor')
            ],
            operator: '.'
        })
    }
}