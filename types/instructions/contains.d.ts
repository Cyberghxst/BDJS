import { OperatorNode } from '../classes/core/Nodes';
import { BaseInstruction, ReturnType } from '../classes/core/BaseInstruction';
import { type Transpiler } from '../classes/core/Transpiler';
import { type Token } from 'akore';
/**
 * @name $contains
 * @description Check if a text contains a value.
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
