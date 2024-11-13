import type { Instruction } from '@structures/Instruction'

/**
 * Represents an instruction manager.
 */
export class InstructionManager {
    /**
     * The instruction registry.
     */
    public static cache = new Map<string, Instruction>()

    /**
     * Adds the given instructions to the manager.
     * @param instructions - Instructions to be added.
     * @returns {void}
     */
    public static add(...instructions: Instruction[]) {
        instructions.forEach((i) => {
            InstructionManager.cache.set(i.name, i)
        })
    }

    /**
     * Pulls an instruction by name.
     * @param name - The name of the instruction.
     * @returns {?Instruction}
     */
    public static pull(name: string): Instruction | null
    /**
     * Pulls an instruction by matching a callback.
     * @param cb - The callback to execute.
     * @returns {?Instruction}
     */
    public static pull(cb: (instruction: Instruction) => boolean): Instruction | null
    public static pull(nameOrCallback: string | ((instruction: Instruction) => boolean)) {
        if (typeof nameOrCallback === 'string') {
            return InstructionManager.cache.get(nameOrCallback) || null
        }

        return InstructionManager.toArray().find(nameOrCallback) || null
    }

    /**
     * Returns the cached instruction as array.
     * @returns {Instruction[]}
     */
    public static toArray() {
        return [...InstructionManager.cache.values()]
    }
}