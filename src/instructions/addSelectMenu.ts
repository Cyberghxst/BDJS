import { ArrayNode, BaseNode, CallNode, LiteralNode, OperatorNode } from '@core/Nodes'
import { BaseInstruction, ReturnType } from '@core/BaseInstruction'
import makeIdentifier from '@functions/makeIdentifier'
import { type Transpiler } from '@core/Transpiler'
import makePattern from '@functions/makePattern'
import { type Token } from 'akore'
import { Logger } from '@core/Logger'
import ensureFields from '@functions/ensureFields'

/**
 * @name $addSelectMenu
 * @description Adds a select menu to the container.
 * @returns {unknown}
 */
export default class extends BaseInstruction {
    patterns = makePattern('$addSelectMenu', true)
    description = 'Adds a select menu to the container.'
    params = [
        {
            name: 'Type',
            description: 'The type of select menu to be added.',
            type: ReturnType.String,
            required: true,
            spread: false
        },
        {
            name: 'Custom ID',
            description: 'Custom ID to identify this select menu.',
            type: ReturnType.String,
            required: true,
            spread: false
        },
        {
            name: 'Placeholder',
            description: 'The placeholder of this select menu.',
            type: ReturnType.String,
            required: false,
            spread: false
        },
        {
            name: 'Disabled',
            description: 'Whether this select menu should be disabled.',
            type: ReturnType.Boolean,
            required: false,
            spread: false
        },
        {
            name: 'Minimum Values',
            description: 'The minimum values for this menu to be selected.',
            type: ReturnType.Number,
            required: false,
            spread: false
        },
        {
            name: 'Maximum Values',
            description: 'The maximum values for this menu to be selected.',
            type: ReturnType.Number,
            required: false,
            spread: false
        },
        {
            name: 'Index',
            description: 'Action row index to attach this select menu to.',
            type: ReturnType.Number,
            required: false,
            spread: false
        }
    ]
    identifier = makeIdentifier(__filename)
    returnType = ReturnType.Unknown
    version = '2.0.0'
    resolve({ inside = '' }: Token<Transpiler>) {
        const values = [...this.splitByDelimiter(inside)]
        const [type, customId, placeholder, disabled, minValues, maxValues, index] = values;

        ensureFields(this.params, values, this.identifier)

        const args: BaseNode[] = [
            this.transpiler.resolveString(type),
            this.transpiler.resolveString(customId)
        ]

        if (placeholder) args.push(this.transpiler.resolveString(placeholder));
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
        if (minValues) args.push(this.transpiler.resolveNumber(minValues));
        if (maxValues) args.push(this.transpiler.resolveNumber(maxValues));

        return new CallNode({
            callee: new LiteralNode('runtime.container.addSelectMenu'),
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