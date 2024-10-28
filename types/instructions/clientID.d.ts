import { BaseInstruction, ReturnType } from '../classes/core/BaseInstruction';
import { LiteralNode } from '../classes/core/Nodes';
/**
 * @name $clientID
 * @description Returns the ID of the client.
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
