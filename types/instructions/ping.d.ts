import { BaseInstruction, ReturnType } from '../classes/core/BaseInstruction';
import { LiteralNode } from '../classes/core/Nodes';
/**
 * @name $ping
 * @description Returns the websocket ping of the client.
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
