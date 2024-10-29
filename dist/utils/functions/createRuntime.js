"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = createRuntime;
const node_vm_1 = require("node:vm");
/**
 * Creates a runtime context to be evaled safely.
 * @param runtime - Runtime data.
 * @returns {import('node:vm').Context}
 */
function createRuntime(runtime) {
    return (0, node_vm_1.createContext)({
        runtime,
        require,
        module,
        process
    }, { codeGeneration: { wasm: false } });
}
