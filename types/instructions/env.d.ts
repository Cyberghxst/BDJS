import { BaseInstruction, ReturnType } from '../classes/core/BaseInstruction';
import { Transpiler } from '../classes/core/Transpiler';
import { Token } from 'akore';
import { OperatorNode } from '../classes/core/Nodes';
/**
 * @name $env
 * @description Returns an environment value.
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
    resolve({ inside }: Token<Transpiler>): OperatorNode;
}
