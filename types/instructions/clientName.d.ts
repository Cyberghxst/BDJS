import { BaseInstruction } from '../classes/core/BaseInstruction';
import { LiteralNode } from '../classes/core/Nodes';
/**
 * @name $clientName
 * @description Returns the name of the client.
 * @returns {number}
 */
export default class extends BaseInstruction {
    patterns: import("akore").Patterns;
    identifier: string;
    resolve(): LiteralNode;
}