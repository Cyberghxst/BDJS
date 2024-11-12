"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InstructionManager = void 0;
/**
 * Represents an instruction manager.
 */
class InstructionManager {
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
/**
 * The instruction registry.
 */
InstructionManager.cache = new Map();
