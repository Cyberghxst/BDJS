import makePattern from '@functions/makePattern'
import makeIdentifier from '@functions/makeIdentifier'
import { collectFiles } from '@functions/collectFiles'
import { loadInstructions } from '@functions/loadInstructions'
import getConditionOperators from '@functions/getConditionOperators'
import isMathConditionOperator from '@functions/isMathConditionOperator'
import createRuntime from '@functions/createRuntime'
import runCode from '@functions/runCode'

export * from './classes/core/BaseInstruction'
export * from './classes/core/Nodes'
export * from './classes/core/Transpiler'
export * from './classes/structures/Runtime'
export * from './classes/structures/DiscordClient'
export * from './classes/structures/Command'
export * from './classes/core/BaseEventHandler'
export * from './classes/core/extended/DiscordEventHandler'

export {
    makePattern,
    makeIdentifier,
    collectFiles,
    loadInstructions,
    getConditionOperators,
    isMathConditionOperator,
    createRuntime,
    runCode
}