import { BaseInstruction, ReturnType } from '../classes/core/BaseInstruction';
import { OperatorNode } from '../classes/core/Nodes';
import { Transpiler } from '../classes/core/Transpiler';
import { Token } from 'akore';
/**
 * @name $toFixed
 * @description Fixes the decimals of a number.
 * @returns {number}
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
