import { BaseInstruction, ReturnType } from '@core/BaseInstruction';
import { LiteralNode, OperatorNode } from '@core/Nodes';
import { Token } from 'akore';
import { Transpiler } from '@core/Transpiler';
/**
 * @name $mentioned
 * @description Returns the ID of the mentioned user.
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
    resolve({ inside }: Token<Transpiler>): OperatorNode | LiteralNode;
}
