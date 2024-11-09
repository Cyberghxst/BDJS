import { BaseInstruction, ReturnType } from '@core/BaseInstruction';
import { LiteralNode } from '@core/Nodes';
/**
 * @name $break
 * @description Stops the execution of an iteration.
 * @returns {unknown}
 */
export default class extends BaseInstruction {
    patterns: import("akore").Patterns;
    description: string;
    identifier: string;
    returnType: ReturnType;
    version: string;
    resolve(): LiteralNode;
}
