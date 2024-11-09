import { BaseInstruction, ReturnType } from '../classes/core/BaseInstruction';
import { CallNode } from '../classes/core/Nodes';
import { Transpiler } from '../classes/core/Transpiler';
import { LexicalFlags, Token } from 'akore';
/**
 * @name $log
 * @description Logs a message into the console.
 * @returns {unknown}
 */
export default class extends BaseInstruction {
    patterns: import("akore").Patterns;
    description: string;
    params: {
        name: string;
        description: string;
        type: ReturnType;
        required: boolean;
        spread: boolean;
    }[];
    flags: LexicalFlags;
    identifier: string;
    returnType: ReturnType;
    version: string;
    resolve({ inside }: Token<Transpiler>): CallNode;
}
