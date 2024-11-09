import { BaseInstruction, ReturnType } from '@core/BaseInstruction';
import { CallNode, LiteralNode } from '@core/Nodes';
import { Transpiler } from '@core/Transpiler';
import { Token } from 'akore';
/**
 * @name $args
 * @description Retrieve the message arguments.
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
    resolve({ inside }: Token<Transpiler>): LiteralNode | CallNode;
}
