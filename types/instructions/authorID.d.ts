import { BaseInstruction, ReturnType } from '@core/BaseInstruction';
import { LiteralNode } from '@core/Nodes';
/**
 * @name $authorID
 * @description Returns the message author ID.
 * @returns {string}
 */
export default class extends BaseInstruction {
    patterns: import("akore").Patterns;
    description: string;
    identifier: string;
    returnType: ReturnType;
    version: string;
    resolve(): LiteralNode;
}
