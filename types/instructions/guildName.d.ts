import { BaseInstruction, ReturnType } from '@core/BaseInstruction';
import { LiteralNode, OperatorNode } from '@core/Nodes';
import { type Transpiler } from '@core/Transpiler';
import { type Token } from 'akore';
/**
 * @name $guildName
 * @description Returns the name of the current or given guild.
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
