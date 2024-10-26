import { CallNode } from '../classes/core/Nodes';
import { BaseInstruction } from '../classes/core/BaseInstruction';
import { Transpiler } from '../classes/core/Transpiler';
import { Token } from 'akore';
/**
 * @name $call
 * @description Calls a function from the JavaScript context.
 * @returns {number}
 */
export default class extends BaseInstruction {
    patterns: import("akore").Patterns;
    identifier: string;
    resolve({ inside, match }: Token<Transpiler>): CallNode;
}
