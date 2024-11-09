import { BaseInstruction, ReturnType } from '@core/BaseInstruction';
/**
 * @name $packageVersion
 * @description Returns the current version of BDJS.
 * @returns {string}
 */
export default class extends BaseInstruction {
    patterns: import("akore").Patterns;
    description: string;
    identifier: string;
    returnType: ReturnType;
    version: string;
    resolve(): import("@core/Nodes").LiteralNode | import("@core/Nodes").CallNode;
}
