"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InstructionManager = void 0;
/**
 * Represents an instruction manager.
 */
class InstructionManager {
    /**
     * The instruction registry.
     */
    static cache = new Map();
    /**
     * Adds the given instructions to the manager.
     * @param instructions - Instructions to be added.
     * @returns {void}
     */
    static add(...instructions) {
        instructions.forEach((i) => {
            InstructionManager.cache.set(i.name, i);
        });
    }
    static pull(nameOrCallback) {
        if (typeof nameOrCallback === 'string') {
            return InstructionManager.cache.get(nameOrCallback) || null;
        }
        return InstructionManager.toArray().find(nameOrCallback) || null;
    }
    /**
     * Returns the cached instruction as array.
     * @returns {Instruction[]}
     */
    static toArray() {
        return [...InstructionManager.cache.values()];
    }
}
exports.InstructionManager = InstructionManager;
