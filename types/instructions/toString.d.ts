import { BaseInstruction, ReturnType } from '@core/BaseInstruction';
import { Transpiler } from '@core/Transpiler';
import { Token } from 'akore';
/**
 * @name $toString
 * @description Converts a value to a string.
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
    resolve({ inside }: Token<Transpiler>): import("@core/Nodes").LiteralNode | import("@core/Nodes").CallNode;
}
