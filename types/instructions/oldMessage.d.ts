import { BaseInstruction, ReturnType } from '../classes/core/BaseInstruction';
import { OperatorNode } from '../classes/core/Nodes';
/**
 * @name $oldMessage
 * @description Retrieves an old message data.
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
    resolve({ inside }: {
        inside?: string;
    }): OperatorNode;
}
