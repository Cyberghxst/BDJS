import { BaseInstruction, ReturnType } from '@core/BaseInstruction';
import { OperatorNode } from '@core/Nodes';
/**
 * @name $oldEmoji
 * @description Retrieves an old emoji data.
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
