import makePattern from '@functions/makePattern'
import makeIdentifier from '@functions/makeIdentifier'
import { collectFiles } from '@functions/collectFiles'
import { loadInstructions } from '@functions/loadInstructions'
import getConditionOperators from '@functions/getConditionOperators'
import isMathConditionOperator from '@functions/isMathConditionOperator'

export * from './classes/core/BaseInstruction'
export * from './classes/core/Nodes'
export * from './classes/core/Transpiler'
export * from './classes/structures/Runtime'
export * from './classes/structures/DiscordClient'

export {
    makePattern,
    makeIdentifier,
    collectFiles,
    loadInstructions,
    getConditionOperators,
    isMathConditionOperator
}