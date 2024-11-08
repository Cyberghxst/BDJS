import { BaseInstruction, ReturnType } from '../classes/core/BaseInstruction';
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
    resolve(): import("..").LiteralNode | import("..").CallNode;
}
