import { Runtime } from '@structures/Runtime'
import { createContext } from 'node:vm'

/**
 * Creates a runtime context to be evaled safely.
 * @param runtime - Runtime data.
 * @returns {import('node:vm').Context}
 */
export default function createRuntime(runtime: Runtime) {
    return createContext({
        runtime,
        require,
        module
    }, { codeGeneration: { wasm: false } })
}