import { BaseInstruction, ReturnType } from '@core/BaseInstruction';
import { CallNode } from '@core/Nodes';
import { Transpiler } from '@core/Transpiler';
import { Token } from 'akore';
/**
 * @name $getGlobalValue
 * @description Get a global runtime variable.
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
    resolve({ inside }: Token<Transpiler>): CallNode;
}
