import { BaseInstruction, ReturnType } from '@core/BaseInstruction';
import { OperatorNode } from '@core/Nodes';
import { type Transpiler } from '@core/Transpiler';
import { type Token } from 'akore';
/**
 * @name $guildChannelExists
 * @description Check whether current or given channel ID exists in the current or given guild.
 * @returns {boolean}
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
