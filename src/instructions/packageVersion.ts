import { BaseInstruction, ReturnType } from '@core/BaseInstruction'
import makeIdentifier from '@functions/makeIdentifier'
import makePattern from '@functions/makePattern'
import getVersion from '@functions/getVersion'

/**
 * @name $packageVersion
 * @description Returns the current version of BDJS.
 * @returns {string}
 */
export default class extends BaseInstruction {
    patterns = makePattern('$packageVersion')
    description = 'Returns the current version of BDJS.'
    identifier = makeIdentifier(__filename)
    returnType = ReturnType.String
    version = '2.0.0'
    resolve() {
        return this.transpiler.resolveString(getVersion())
    }
}
