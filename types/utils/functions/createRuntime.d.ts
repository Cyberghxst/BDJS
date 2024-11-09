import { Runtime } from '../../classes/structures/Runtime';
/**
 * Creates a runtime context to be evaled safely.
 * @param runtime - Runtime data.
 * @returns {import('node:vm').Context}
 */
export default function createRuntime(runtime: Runtime): import("vm").Context;
