import { LiteralNode, OperatorNode } from '@core/Nodes';
import { BaseInstruction, ReturnType } from '@core/BaseInstruction';
import { type Transpiler } from '@core/Transpiler';
import { type Token } from 'akore';
/**
 * @name $userAvatar
 * @description Returns the avatar URL of an user.
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
