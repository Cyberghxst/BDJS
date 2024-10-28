import { BaseInstruction, ReturnType } from '@core/BaseInstruction'
import makeIdentifier from '@functions/makeIdentifier'
import makePattern from '@functions/makePattern'
import { Transpiler } from '@core/Transpiler'
import { Token } from 'akore'

/**
 * @name $toString
 * @description Converts a value to a string.
 * @returns {string}
 */
export default class extends BaseInstruction {
    patterns = makePattern('$toString', true)
    description = 'Converts a value to a string.'
    params = [
        {
            name: 'Value',
            description: 'The value to convert.',
            type: ReturnType.String,
            required: true,
            spread: false
        }
    ]
    identifier = makeIdentifier(__filename)
    returnType = ReturnType.String
    version = '2.0.0'
    resolve({ inside = '' }: Token<Transpiler>) {
        const [value] = this.splitByDelimiter(inside)

        return this.transpiler.resolveString(value)
    }
}