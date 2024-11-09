import { BaseInstruction, ReturnType } from '@core/BaseInstruction';
import { OperatorNode } from '@core/Nodes';
import { type Transpiler } from '@core/Transpiler';
import { type Token } from 'akore';
/**
 * @name $endsWith
 * @description Check if a text ends with a value.
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
