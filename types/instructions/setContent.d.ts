import { BaseInstruction, ReturnType } from '../classes/core/BaseInstruction';
import { AssignmentNode, LiteralNode } from '../classes/core/Nodes';
import { Transpiler } from '../classes/core/Transpiler';
import { Token } from 'akore';
/**
 * @name $setContent
 * @description Set the content of the container.
 * @returns {unknown}
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
    resolve({ inside }: Token<Transpiler>): AssignmentNode<LiteralNode, LiteralNode | import("../classes/core/Nodes").CallNode>;
}
