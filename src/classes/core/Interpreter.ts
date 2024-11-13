import { CompiledInstruction, type InstructionToken, mainInstruction } from './Lexer'
import { type FormedCommand } from '@structures/Command'
import { type Runtime } from '@structures/Runtime'
import { ExecutionError } from './Errors'

export interface Runnable {
    command: FormedCommand<any>
}

export async function Interpreter(ast: InstructionToken[] | InstructionToken, runtime: Runtime) {
    if (typeof ast === 'undefined') return '';

    if (!Array.isArray(ast)) ast = [ast];
    if (`$${ast[0]?.name}` === mainInstruction) ast = ast[0].children;

    let output = ''

    for (const token of ast) {
        let fields = token.isFieldless() ? [] : token.fields!.map((field) => field.value);

        for (const child of token.children) {
            const result = await Interpreter(child, runtime) ?? ''

            fields[child.from!].replace(token.toString(), result)
        }
        
        const instruction = new CompiledInstruction(token, runtime)
        const result = await instruction.call(fields)

        if (result.isAnyError()) {
            throw new ExecutionError(token, result.content)
        } else if (result.isReturnKeyword()) {
            return result.content
        }

        output += result.content
    }

    return output
}