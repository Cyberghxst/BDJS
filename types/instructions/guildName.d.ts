import { BaseInstruction, ReturnType } from '../classes/core/BaseInstruction';
import { LiteralNode, OperatorNode } from '../classes/core/Nodes';
import { type Transpiler } from '../classes/core/Transpiler';
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
    resolve({ inside }: Token<Transpiler>): LiteralNode | OperatorNode;
}