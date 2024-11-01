import { BaseInstruction, ReturnType } from '@core/BaseInstruction'
import { CallNode, LiteralNode, OperatorNode } from '@core/Nodes'
import makeIdentifier from '@functions/makeIdentifier'
import makePattern from '@functions/makePattern'
import { Transpiler } from '@core/Transpiler'
import { Token } from 'akore'

/**
 * @name $thumbnail
 * @description Set the embed thumbnail.
 * @returns {unknown}
 */
export default class extends BaseInstruction {
    patterns = makePattern('$thumbnail', true)
    description = 'Set the embed thumbnail.'
    params = [
        {
            name: 'Text',
            description: 'The text to set as thumbnail.',
            type: ReturnType.String,
            required: true,
            spread: false
        },
        {
            name: 'Index',
            description: 'The embed index to set the thumbnail to.',
            type: ReturnType.Number,
            required: false,
            spread: false
        }
    ]
    identifier = makeIdentifier(__filename)
    returnType = ReturnType.Unknown
    version = '2.0.0'
    resolve({ inside = '' }: Token<Transpiler>) {
        const [url, index] = this.splitByDelimiter(inside)

        return new OperatorNode({
            elements: [
                new CallNode({
                    callee: new LiteralNode('runtime.container.getEmbed'),
                    parameters: new OperatorNode({
                        elements: [
                            index !== undefined ? this.transpiler.resolveNumber(index) : new LiteralNode('undefined')
                        ],
                        operator: ', '
                    }),
                    zero: false
                }),
                new CallNode({
                    callee: new LiteralNode('setThumbnail'),
                    parameters: new OperatorNode({
                        elements: [this.transpiler.resolveString(url)],
                        operator: ', '
                    }),
                    zero: false
                })
            ],
            operator: '.'
        })
    }
}
