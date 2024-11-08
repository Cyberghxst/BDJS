import { BaseInstruction, ReturnType } from '@core/BaseInstruction'
import { CallNode, LiteralNode, OperatorNode } from '@core/Nodes'
import makeIdentifier from '@functions/makeIdentifier'
import { type Transpiler } from '@core/Transpiler'
import makePattern from '@functions/makePattern'
import { type Token } from 'akore'

/**
 * @name $getInstruction
 * @description Gets information about an instruction.
 * @returns {string}
 */
export default class extends BaseInstruction {
    patterns = makePattern('$getInstruction', true)
    description = 'Gets information about an instruction.'
    params = [
        {
            name: 'Name',
            description: 'The name of the instruction to get.',
            type: ReturnType.String,
            required: true,
            spread: false
        }
    ]
    identifier = makeIdentifier(__filename)
    returnType = ReturnType.String
    version = '2.0.0'
    resolve({ inside = '' }: Token<Transpiler>) {
        const [rawName, ...properties] = this.splitByDelimiter(inside)
        const name = this.transpiler.resolveString((rawName.startsWith('$') ? rawName : '$' + rawName).toLowerCase())

        return new OperatorNode({
            elements: [
                new LiteralNode('runtime.normalizedInstructions()'),
                new CallNode({
                    callee: new LiteralNode('find'),
                    parameters: new OperatorNode({
                        elements: [
                            new LiteralNode(`it => it.name.toLowerCase() === ${name.serialize()}`)
                        ],
                        operator: ', '
                    }),
                    zero: false
                }),
                ...properties.map(v => new LiteralNode(v))
            ],
            operator: '.'
        })
    }
}