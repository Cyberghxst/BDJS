import { BaseInstruction, ReturnType } from '@core/BaseInstruction'
import { CallNode, KeyValueNode, LiteralNode, OperatorNode } from '@core/Nodes'
import makeIdentifier from '@functions/makeIdentifier'
import makePattern from '@functions/makePattern'
import { Transpiler } from '@core/Transpiler'
import { Token } from 'akore'

/**
 * @name $author
 * @description Set the embed author.
 * @returns {unknown}
 */
export default class extends BaseInstruction {
    patterns = makePattern('$author', true)
    description = 'Set the embed author.'
    params = [
        {
            name: 'Name',
            description: 'The name to set as author.',
            type: ReturnType.String,
            required: true,
            spread: false
        },
        {
            name: 'Icon URL',
            description: 'The URL of the icon to set in author.',
            type: ReturnType.String,
            required: true,
            spread: false
        },
        {
            name: 'Index',
            description: 'The embed index to set the author to.',
            type: ReturnType.Number,
            required: false,
            spread: false
        }
    ]
    identifier = makeIdentifier(__filename)
    returnType = ReturnType.Unknown
    version = '2.0.0'
    resolve({ inside = '' }: Token<Transpiler>) {
        const [name, icon, index] = this.splitByDelimiter(inside)
        const keyValues = new KeyValueNode([[new LiteralNode('name'), this.transpiler.resolveString(name)]])
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
                    callee: new LiteralNode('setAuthor'),
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
