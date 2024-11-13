import { type InstructionToken } from './Lexer';
import { type FormedCommand } from '../structures/Command';
import { type Runtime } from '../structures/Runtime';
export interface Runnable {
    command: FormedCommand<any>;
}
export declare function Interpreter(ast: InstructionToken[] | InstructionToken, runtime: Runtime): Promise<string>;
