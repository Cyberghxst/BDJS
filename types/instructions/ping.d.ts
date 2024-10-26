import { BaseInstruction } from '../classes/core/BaseInstruction';
import { LiteralNode } from '../classes/core/Nodes';
/**
 * @name $ping
 * @description Returns the websocket ping of the client.
 * @returns {number}
 */
export default class extends BaseInstruction {
    patterns: import("akore").Patterns;
    identifier: string;
    resolve(): LiteralNode;
}
