import { ArrayNode, BaseNode, CallNode, LiteralNode, OperatorNode } from '@core/Nodes'
import { BaseInstruction, ReturnType } from '@core/BaseInstruction'
import makeIdentifier from '@functions/makeIdentifier'
import { type Transpiler } from '@core/Transpiler'
import makePattern from '@functions/makePattern'
import { type Token } from 'akore'

/**
 * @name $addButton
 * @description Adds a button to the container.
 * @returns {unknown}
 */
export default class extends BaseInstruction {
    patterns = makePattern('$addButton', true)
    description = 'Adds a button to the container.'
    params = [
        {
            name: 'Custom ID',
            description: 'Custom ID, Link or SKU ID to identify this button.',
            type: ReturnType.String,
            required: true,
            spread: false
        },
        {
            name: 'Style',
            description: 'The style of this button.',
            type: ReturnType.String,
            required: true,
            spread: false
        },
        {
            name: 'Label',
            description: 'The label of this button.',
            type: ReturnType.String,
            required: false,
            spread: false
        },
        {
            name: 'Emoji',
            description: 'The emoji of this button.',
            type: ReturnType.String,
            required: false,
            spread: false
        },
        {
            name: 'Disabled',
            description: 'Whether this button should be disabled.',
            type: ReturnType.Boolean,
            required: false,
            spread: false
        },
        {
            name: 'Index',
            description: 'Action row index to attach this button to.',
            type: ReturnType.Number,
            required: false,
            spread: false
        }
    ]
    identifier = makeIdentifier(__filename)
    returnType = ReturnType.Boolean
    version = '2.0.0'
    resolve({ inside = '' }: Token<Transpiler>) {
        const [customId, style, label, emoji, disabled, index] = this.splitByDelimiter(inside)
        const args: BaseNode[] = [
            this.transpiler.resolveString(customId),
            this.transpiler.resolveString(style)
        ]

        if (label) args.push(this.transpiler.resolveString(label));
        if (emoji) args.push(this.transpiler.resolveString(emoji));
        if (disabled) {
            const value = this.transpiler.lexer.tokenize(disabled)
            if (value.next().value === undefined) {
                args.push(new LiteralNode(disabled))
            } else {
                args.push(new CallNode({
                    callee: new LiteralNode('Boolean'),
                    parameters: new OperatorNode({
                        elements: [this.transpiler.resolveString(disabled)],
                        operator: ', '
                    }),
                    zero: false
                }))
            }
        }

        return new CallNode({
            callee: new LiteralNode('runtime.container.addButton'),
            parameters: new OperatorNode({
                elements: [
                    new ArrayNode(args, false),
                    index !== undefined ? this.transpiler.resolveNumber(index) : new LiteralNode('undefined')
                ],
                operator: ', '
            }),
            zero: false
        })
    }
}