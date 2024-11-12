import { FormedCommand } from '@structures/Command'
import { Runtime } from '@structures/Runtime'
import { InstructionToken } from './Lexer'

export interface Runnable {
    command: FormedCommand<any>
}

export function Interpreter(ast: InstructionToken[], runtime: Runtime) {
    for (const token of ast) {
        if (token.isFieldless()) {
            // const result = token.data?.run.call()
        }
    }
}