import { FormedCommand } from '../structures/Command';
import { Runtime } from '../structures/Runtime';
import { InstructionToken } from './Lexer';
export interface Runnable {
    command: FormedCommand<any>;
}
export declare function Interpreter(ast: InstructionToken[], runtime: Runtime): void;
