import { CallNode } from '@core/Nodes';
import { BaseInstruction, ReturnType } from '@core/BaseInstruction';
import { Transpiler } from '@core/Transpiler';
import { Token } from 'akore';
/**
 * @name $call
 * @description Calls a function from the JavaScript context.
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
    resolve({ inside, match }: Token<Transpiler>): CallNode;
}
