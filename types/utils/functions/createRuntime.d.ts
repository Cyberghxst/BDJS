/// <reference types="node" />
import { Runtime } from '@structures/Runtime';
/**
 * Creates a runtime context to be evaled safely.
 * @param runtime - Runtime data.
 * @returns {import('node:vm').Context}
 */
export default function createRuntime(runtime: Runtime): import("vm").Context;
