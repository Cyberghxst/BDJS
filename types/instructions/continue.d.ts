import { BaseInstruction, ReturnType } from '@core/BaseInstruction';
import { LiteralNode } from '@core/Nodes';
/**
 * @name $continue
 * @description Continues with the next iteration.
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
