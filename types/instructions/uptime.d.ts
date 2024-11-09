import { BaseInstruction, ReturnType } from '@core/BaseInstruction';
import { LiteralNode } from '@core/Nodes';
/**
 * @name $uptime
 * @description Returns the client uptime.
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
