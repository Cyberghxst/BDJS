import type { Instruction } from '../structures/Instruction';
/**
 * Represents an instruction manager.
 */
export declare class InstructionManager {
    /**
     * The instruction registry.
     */
    static cache: Map<string, Instruction<import("../structures/Instruction").ArgData<import("../structures/Instruction").DataType, import("../structures/Instruction").FieldLevel, boolean, unknown>[], boolean, boolean>>;
    /**
     * Pulls an instruction by name.
     * @param name - The name of the instruction.
     * @returns {?Instruction}
     */
    static pull(name: string): Instruction | null;
    /**
     * Pulls an instruction by matching a callback.
     * @param cb - The callback to execute.
     * @returns {?Instruction}
     */
    static pull(cb: (instruction: Instruction) => boolean): Instruction | null;
    /**
     * Returns the cached instruction as array.
     * @returns {Instruction[]}
     */
    static toArray(): Instruction<import("../structures/Instruction").ArgData<import("../structures/Instruction").DataType, import("../structures/Instruction").FieldLevel, boolean, unknown>[], boolean, boolean>[];
}
