import { ControlFlowNode } from '@core/Nodes';
import { BaseInstruction, ReturnType } from '@core/BaseInstruction';
import { Transpiler } from '@core/Transpiler';
import { Token } from 'akore';
/**
 * @name $elseif
 * @description Executes a JavaScript "else if" statement.
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
    resolve({ inside }: Token<Transpiler>): ControlFlowNode;
}
