import { CallNode, OperatorNode } from '../classes/core/Nodes';
import { BaseInstruction } from '../classes/core/BaseInstruction';
import { type Transpiler } from '../classes/core/Transpiler';
import { type Token } from 'akore';
/**
 * @name $userAvatar
 * @description Returns the token of the client.
 * @returns {number}
 */
export default class extends BaseInstruction {
    patterns: import("akore").Patterns;
    identifier: string;
    resolve({ inside }: Token<Transpiler>): CallNode | OperatorNode;
}
