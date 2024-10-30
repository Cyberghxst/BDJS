import { BaseInstruction, ReturnType } from '../classes/core/BaseInstruction';
import { CallNode, LiteralNode } from '../classes/core/Nodes';
import { type Transpiler } from '../classes/core/Transpiler';
import { type Token } from 'akore';
/**
 * @name $channelName
 * @description Returns the name of the current channel.
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
