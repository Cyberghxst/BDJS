import { OperatorNode } from '@core/Nodes';
import { BaseInstruction, ReturnType } from '@core/BaseInstruction';
import { Transpiler } from '@core/Transpiler';
import { Token } from 'akore';
/**
 * @name $guildLeave
 * @description Force the client to leave a guild.
 * @returns {unknown}
 */
export default class extends BaseInstruction {
    patterns: import("akore").Patterns;
    description: string;
    params: {
        name: string;
        description: string;
        type: ReturnType;
        required: boolean;
        spread: boolean;
    }[];
    identifier: string;
    returnType: ReturnType;
    version: string;
    resolve({ inside }: Token<Transpiler>): OperatorNode;
}
