import { BaseInstruction } from '../../classes/core/BaseInstruction';
/**
 * Load instructions from the desired directory.
 * @param dir - Directory to load the instructions from.
 */
export declare function loadInstructions(dir: string, callback: (instructions: typeof BaseInstruction[]) => void): void;
