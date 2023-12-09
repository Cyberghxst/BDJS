import { FunctionManager } from '../managers/Function'
import { StringCommandTypes } from '../index'
import { CompiledData, Reader } from '../core/Reader'
import { Condition } from '../util/Condition'
import { BaseFunction } from './Function'
import { Container } from './Container'
import { Context } from './Context'
import { Util } from '../util/Util'
import { Log } from '../util/Log'
import { Bot } from './Bot'

interface DataOptions {
    /** BDJS client instance. */
    bot?: Bot
    /** Environment variable cache. */
    env?: Record<string, any>
    /** Function manager. */
    functions?: FunctionManager
    /** The instance time for this data. */
    instanceTime?: Date
    /** The current command type for this instance. */
    commandType: StringCommandTypes
    reader: Reader
    context?: Context<any>
    container?: Container
}


export class Data {
    bot?: Bot
    code: string
    condition: typeof Condition
    ctx?: Context<any>
    env: Record<string, any>
    functions: FunctionManager
    function?: BaseFunction
    instanceTime?: Date
    commandType: StringCommandTypes
    compiled: CompiledData & Record<string, any>
    container: Container
    reader: Reader
    util: typeof Util
    logs: typeof Log
    constructor(options: DataOptions) {
        this.bot = options.bot
        this.code = ''
        this.env = options.env ?? {}
        this.functions = options.bot?.functions ?? options.functions ?? new FunctionManager
        this.instanceTime = options.instanceTime ?? new Date
        this.commandType = options.commandType ?? 'unknown'
        this.compiled = {} as CompiledData
        this.function = {} as BaseFunction
        this.container = options.container ?? new Container
        this.ctx = options.context
        this.reader = options.reader ?? new Reader()
        this.condition = Condition
        this.logs = Log
        this.util = Util
    }

    /**
     * Deletes a environment variable from the cache.
     * @param {string} name - The variable name.
     * @returns {Data}
     */
    deleteEnvironmentVariable(name: string) {
        delete this.env[name]
        return this
    }

    /**
     * Extends a parent data.
     * @param options - Data options to inherit.
     * @returns {Data}
     */
    extend(options: DataOptions): Data {
        return new Data({ ...options })
    }

    /**
     * Get a environment variable from the cache.
     * @param {string} name - The variable name.
     * @returns {unknown | undefined}
     */
    getEnvironmentVariable(name: string) {
        return this.env[name]
    }

    /**
     * Check if the variable name exists in the cache.
     * @param {string} name - The variable name.
     * @returns {boolean}
     */
    hasEnvironmentVariable(name: string) {
        return name in this.env
    }

    /**
     * Set a environment variable in the cache.
     * @param {string} name - The variable name.
     * @param {unknown} value - The variable value.
     * @returns {Data}
     */
    setEnvironmentVariable(name: string, value: unknown) {
        this.env[name] = value
        return this
    }

    /**
     * Set the data result.
     * @param {string} text The compiled string result.
     * @returns {Data}
     */
    setCode(text: string) {
        this.code = text
        return this
    }
}