import { BaseInstruction, ReturnType } from '@core/BaseInstruction';
import { OperatorNode } from '@core/Nodes';
import { Transpiler } from '@core/Transpiler';
import { Token } from 'akore';
/**
 * @name $footer
 * @description Set the embed footer.
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
    identifier: string;
    returnType: ReturnType;
    version: string;
    resolve({ inside }: Token<Transpiler>): OperatorNode;
}
