import { CallNode, KeyValueNode, LiteralNode, OperatorNode } from '@core/Nodes'
import { BaseInstruction, ReturnType } from '@core/BaseInstruction'
import makeIdentifier from '@functions/makeIdentifier'
import makePattern from '@functions/makePattern'
import { Transpiler } from '@core/Transpiler'
import { Token } from 'akore'

/**
 * @name $addField
 * @description Set the embed addField.
 * @returns {unknown}
 */
export default class extends BaseInstruction {
    patterns = makePattern('$addField', true)
    description = 'Adds an embed field.'
    params = [
        {
            name: 'Title',
            description: 'The text to set as field title.',
            type: ReturnType.String,
            required: true,
            spread: false
        },
        {
            name: 'Value',
            description: 'The text to set as field value.',
            type: ReturnType.String,
            required: true,
            spread: false
        },
        {
            name: 'Inline',
            description: 'Whether set the field inline.',
            type: ReturnType.Boolean,
            required: false,
            spread: false
        },
        {
            name: 'Index',
            description: 'The embed index to set the field to.',
            type: ReturnType.Number,
            required: false,
            spread: false
        }
    ]
    identifier = makeIdentifier(__filename)
    returnType = ReturnType.Unknown
    version = '2.0.0'
    resolve({ inside = '' }: Token<Transpiler>) {
        const [title, value, inline, index] = this.splitByDelimiter(inside)
        const keyValues = new KeyValueNode([
            [new LiteralNode('name'), this.transpiler.resolveString(title)],
            [new LiteralNode('value'), this.transpiler.resolveString(value)],
            [new LiteralNode('inline'), new CallNode({
                callee: new LiteralNode('Boolean'),
                parameters: new OperatorNode({
                    elements: [this.transpiler.resolveString(inline || 'false')],
                    operator: ', '
                }),
                zero: false
            })]
        ])

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
                    callee: new LiteralNode('addFields'),
                    parameters: new OperatorNode({
                        elements: [keyValues],
                        operator: ', '
                    }),
                    zero: false
                })
            ],
            operator: '.'
        })
    }
}
