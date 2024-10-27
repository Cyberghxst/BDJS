import { Runtime } from '@structures/Runtime'
import createRuntime from './createRuntime'
import { runInContext } from 'node:vm'

/**
 * Runs BDJS code into a safe sandbox.
 * @param code - Code to be executed.
 * @param runtime - Runtime data.
 * @returns {any}
 */
export default function runCode(code: string, runtime: Runtime) {
    return runInContext(code, createRuntime(runtime))
}