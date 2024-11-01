import { BaseInstruction, ReturnType } from '@core/BaseInstruction'
import { CallNode, KeyValueNode, LiteralNode, OperatorNode } from '@core/Nodes'
import makeIdentifier from '@functions/makeIdentifier'
import makePattern from '@functions/makePattern'
import { Transpiler } from '@core/Transpiler'
import { Token } from 'akore'

/**
 * @name $footer
 * @description Set the embed footer.
 * @returns {unknown}
 */
export default class extends BaseInstruction {
    patterns = makePattern('$footer', true)
    description = 'Set the embed footer.'
    params = [
        {
            name: 'Text',
            description: 'The text to set as footer.',
            type: ReturnType.String,
            required: true,
            spread: false
        },
        {
            name: 'Icon URL',
            description: 'The URL of the icon to set in footer.',
            type: ReturnType.String,
            required: true,
            spread: false
        },
        {
            name: 'Index',
            description: 'The embed index to set the footer to.',
            type: ReturnType.Number,
            required: false,
            spread: false
        }
    ]
    identifier = makeIdentifier(__filename)
    returnType = ReturnType.Unknown
    version = '2.0.0'
    resolve({ inside = '' }: Token<Transpiler>) {
        const [text, icon, index] = this.splitByDelimiter(inside)
        const keyValues = new KeyValueNode([[new LiteralNode('text'), this.transpiler.resolveString(text)]])
        if (icon) {
            keyValues.push([new LiteralNode('iconURL'), this.transpiler.resolveString(icon)])
        }

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
                    callee: new LiteralNode('setFooter'),
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
