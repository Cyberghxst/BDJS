import { BaseInstruction, ReturnType } from '@core/BaseInstruction'
import makeIdentifier from '@functions/makeIdentifier'
import makePattern from '@functions/makePattern'
import { CallNode, LiteralNode, OperatorNode } from '@core/Nodes'
import { Token } from 'akore'
import { Transpiler } from '@core/Transpiler'

/**
 * @name $mentioned
 * @description Returns the ID of the mentioned user.
 * @returns {string}
 */
export default class extends BaseInstruction {
    patterns = makePattern('$mentioned', true)
    description = 'Returns the ID of the mentioned user.'
    params = [
        {
            name: 'Index',
            description: 'Mention index to get.',
            type: ReturnType.String,
            required: false,
            spread: false
        }
    ]
    identifier = makeIdentifier(__filename)
    returnType = ReturnType.String
    version = '2.0.0'
    resolve({ inside }: Token<Transpiler>) {
        if (!inside) return new LiteralNode('runtime.message?.mentions.members?.first()?.id');

        return new OperatorNode({
            elements: [
                new CallNode({
                    callee: new LiteralNode('runtime.message?.mentions.members?.at'),
                    parameters: new OperatorNode({
                        elements: [this.transpiler.resolveNumber(inside)],
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
