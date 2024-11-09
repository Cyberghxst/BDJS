import { BaseInstruction, ReturnType } from '@core/BaseInstruction';
import { LiteralNode, OperatorNode } from '@core/Nodes';
import { type Transpiler } from '@core/Transpiler';
import { type Token } from 'akore';
/**
 * @name $approximatePresenceCount
 * @description Return the approximate presence count of a given guild.
 * @returns {number}
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
