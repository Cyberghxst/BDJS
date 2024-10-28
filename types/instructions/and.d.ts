import { BaseInstruction, ReturnType } from '../classes/core/BaseInstruction';
import { Transpiler } from '../classes/core/Transpiler';
import { OperatorNode } from '../classes/core/Nodes';
import { Token } from 'akore';
/**
 * @name $and
 * @description Executes a JavaScript "and" statement.
 * @returns {boolean}
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
    identifier: string;
    returnType: ReturnType;
    version: string;
    resolve({ inside }: Token<Transpiler>): OperatorNode;
}
