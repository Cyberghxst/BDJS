import { BaseInstruction } from '../classes/core/BaseInstruction';
import { LiteralNode } from '../classes/core/Nodes';
/**
 * @name $clientID
 * @description Returns the ID of the client.
 * @returns {number}
 */
export default class extends BaseInstruction {
    patterns: import("akore").Patterns;
    identifier: string;
    resolve(): LiteralNode;
}
