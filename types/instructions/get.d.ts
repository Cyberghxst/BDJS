import { BaseInstruction, ReturnType } from '@core/BaseInstruction';
import { CallNode } from '@core/Nodes';
import { Transpiler } from '@core/Transpiler';
import { Token } from 'akore';
/**
 * @name $get
 * @description Retrieves the value of a runtime variable.
 * @returns {string}
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
