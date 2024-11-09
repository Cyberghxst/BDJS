import { BaseInstruction, ReturnType } from '@core/BaseInstruction';
import { LiteralNode } from '@core/Nodes';
/**
 * @name $clientToken
 * @description Returns the token of the client.
 * @returns {number}
 */
export default class extends BaseInstruction {
    patterns: import("akore").Patterns;
    description: string;
    identifier: string;
    returnType: ReturnType;
    version: string;
    resolve(): LiteralNode;
}
