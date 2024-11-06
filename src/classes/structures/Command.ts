import { collectFiles } from '@functions/collectFiles'
import createString from '@functions/createString'
import { Transpiler } from '@core/Transpiler'
import { AsciiTable3 } from 'ascii-table3'
import { Logger } from '@core/Logger'
import { Runtime } from './Runtime'
import { minify } from 'uglify-js'
import color from 'cli-color'
import { isAsyncFunction } from 'node:util/types'
import runCode from '@functions/runCode'

/**
 * Command types that Discord contexts provide.
 */
export type DiscordCommandTypes =
    // Message-related events
    | 'prefixed'
    | 'unprefixed'
    | 'alwaysReply'
    | 'messageDelete'
    | 'messageUpdate'

    // Miscelaneous events.
    | 'error'
    | 'ready'

    // Interaction-related events.
    | 'anyInteraction'
    | 'modalInteraction'
    | 'buttonInteraction'
    | 'commandInteraction'
    | 'selectMenuInteraction'
    | 'userContextMenuInteraction'
    | 'messageContextMenuInteraction'
    | 'autocompleteInteraction'

    // Member create/leave events.
    | 'memberJoin'
    | 'memberLeave'
    | 'memberUpdate'

    // Reaction-related events.
    | 'reactionAdd'
    | 'reactionRemove'
    | 'reactionRemoveAll'
    | 'reactionRemoveEmoji'

    // Sticker-related events.
    | 'stickerCreate'
    | 'stickerDelete'
    | 'stickerUpdate'

    // Role-related events.
    | 'roleCreate'
    | 'roleDelete'
    | 'roleUpdate'

    // Bot guild create/leave events.
    | 'clientJoin'
    | 'clientLeave'

    // Channel-related events
    | 'channelCreate'
    | 'channelDelete'
    | 'channelUpdate'

    // Thread-related events.
    | 'threadCreate'
    | 'threadDelete'
    | 'threadUpdate'

    // Ban-related events.
    | 'banAdd'
    | 'banRemove'

    // Emoji-related events.
    | 'emojiCreate'
    | 'emojiDelete'
    | 'emojiUpdate'

    // AuditLog-related events.
    | 'auditLogEntryCreate'

    // User-related events.
    | 'presenceUpdate'
    | 'userUpdate'

    // Automod-related events.
    | 'automodRuleCreate'
    | 'automodRuleDelete'
    | 'automodRuleUpdate'
    | 'automodActionExecution'

    // Entitlement-related events.
    | 'entitlementCreate'
    | 'entitlementUpdate'
    | 'entitlementDelete'

    // Typing-related events.
    | 'typingStart'

/**
 * Custom command types that BDJS provides.
 */
export type CustomCommandTypes = 'timeout' | 'interval'

/**
 * All command types provided by the library.
 */
export type CommandTypes = DiscordCommandTypes | CustomCommandTypes

/**
 * A command executor.
 */
export type CommandExecutor = (runtime: Runtime) => Promise<any> | any

/**
 * The base interface of a command.
 */
export interface IRawCommand<Type extends string = string> {
    /**
     * The name this command has.
     */
    name?: string | RegExp
    /**
     * Additional names this command can match.
     */
    aliases?: string[]
    /**
     * The type of this command.
     */
    type: Type
    /**
     * The native code of this command.
     */
    code: string | CommandExecutor
    /**
     * The transpiled code of the command.
     */
    transpiled?: string | null
    /**
     * The transpiled code without any minification/beautification filter.
     */
    rawTranspiledCode: string | null
    /**
     * The path of this command.
     * If `null`, command was added from main file.
     * Otherwise, it was loaded using the command manager.
     */
    path: string | null
    /**
     * Whether command should be minified.
     * @default true
     */
    minify?: boolean
    /**
     * Whether send the result of the command evaluation.
     * @default false
     */
    sendResult?: boolean
}

/**
 * A BDJS command.
 */
export interface BDJSCommand extends IRawCommand<CommandTypes> {}

/**
 * A BDJS transpiled command.
 */
type BDJSTranspiledCommand = BDJSCommand & { transpiled: string, rawTranspiledCode: string }

/**
 * Represents a transpiled command.
 */
export class TranspiledCommand<Types extends string | IRawCommand> {
    /**
     * Additional information about the command to be logged.
     */
    #logOptions: {
        pass: boolean
        error: Error | undefined
        warnings: string[]
    } = {
        pass: true,
        error: undefined,
        warnings: [],
    };

    /**
     * Starts the command instance.
     */
    constructor(
        private data: Types extends string ? IRawCommand<Types> : Types,
        transpiler: Transpiler
    ) {
        this.ensureMinification(); // Ensure the minification option.
        this.ensureName(); // Ensure the command name.

        let executor: CommandExecutor // Creating the executor.

        if (typeof data.code === 'string') {
            // Transpiling the native code.
            let transpiledCode = transpiler.transpile(data.code);

            // Assign the raw output to its property.
            data.rawTranspiledCode = transpiledCode;

            // Checking if it was transpiled.
            if (typeof transpiledCode === 'string') {
                // Minify the command
                if (data.minify) {
                    const minified = minify(transpiledCode);

                    // Assign the error if any.
                    if (minified.error instanceof Error) {
                        this.#logOptions.error = minified.error;
                        this.#logOptions.pass = false;
                    }

                    // Assign the warning if any.
                    if (Array.isArray(minified.warnings)) {
                        this.#logOptions.warnings = minified.warnings;
                    }

                    // Assign the minified code.
                    transpiledCode = minified.code;
                } else {
                    const beautified = minify(transpiledCode, {
                        compress: false,
                        mangle: false,
                        output: {
                            comments: 'all',
                            beautify: true,
                        },
                    });

                    // Assign the error if any.
                    if (beautified.error instanceof Error) {
                        this.#logOptions.error = beautified.error;
                        this.#logOptions.pass = false;
                    }

                    // Assign the warning if any.
                    if (Array.isArray(beautified.warnings)) {
                        this.#logOptions.warnings = beautified.warnings;
                    }

                    // Assign the beautified code.
                    transpiledCode = beautified.code;
                }

                // Assign the transpiled code to the command.
                data.transpiled = transpiledCode;
                executor = eval(`const __command_executor__ = async (runtime) => { ${transpiledCode} }; __command_executor__`) as CommandExecutor
            }
        } else {
            executor = data.code
        }

        data.code = executor
    }

    /**
     * Call this command.
     * @param runtime - Runtime context to be used.
     */
    public async call(runtime: Runtime) {
        runtime.setCommand<CommandTypes>(this as TranspiledCommand<any>)

        if (typeof this.code === 'function' && isAsyncFunction(this.code)) {
            await this.code(runtime);
        } else if (typeof this.code === 'function' && !isAsyncFunction(this.code)) {
            this.code(runtime);
        } else {
            runCode(this.transpiledCode, runtime)
        }
    }

    /**
     * Ensure the minification option in the command.
     * @returns {void}
     */
    public ensureMinification() {
        this.data.minify =
            typeof this.data.minify !== 'boolean' ? true : this.data.minify;
    }

    /**
     * Ensure the command name.
     * @returns {void}
     */
    public ensureName() {
        this.data.name =
            this.data.name === undefined ? createString() : this.data.name;
    }

    /**
     * Set the command path.
     * @param path - Path to be set.
     * @returns {void}
     */
    public setPath(path: string | null) {
        this.data.path = path
    }

    /**
     * Returns the load info for the log command table.
     */
    public get loadCommandInfo() {
        return [
            this.data.name instanceof RegExp
                ? this.data.name.source
                : this.data.name || 'Unknown',
            this.data.type,
            this.#logOptions.pass
                ? color.green('LOADED')
                : color.red('NOT LOADED'),
            this.data.path === null
                ? 'MAIN FILE'
                : AsciiTable3.truncateString(this.data.path, 20),
        ]
    }

    /**
     * Returns the command code.
     */
    public get code() {
        return this.data.code as CommandExecutor
    }

    /**
     * Returns the name of this command.
     */
    public get name() {
        return this.data.name
    }

    /**
     * Returns the name of this command for the log table.
     */
    public get stringifiedName() {
        return this.data.name instanceof RegExp ? this.data.name.source : this.data.name || 'Unknown'
    }

    /**
     * Returns the command path.
     */
    public get path() {
        return this.data.path
    }

    /**
     * Whether send the result of the command evaluation.
     */
    public get sendResult() {
        return this.data.sendResult ?? false
    }

    /**
     * Returns the transpiled code.
     */
    public get transpiledCode() {
        return this.data.transpiled as string
    }

    /**
     * Returns the command type.
     */
    public get type() {
        return this.data.type
    }
}

/**
 * Represents the load command source.
 */
export enum LoadCommandType {
    Loader,
    Main,
}

/**
 * Represents a base command manager.
 */
export class BaseCommandManager<Types extends string> {
    /**
     * Saves the command path for later loading.
     */
    #path: string | null = null

    /**
     * Command cache.
     */
    public cache: Map<string, TranspiledCommand<Types>> = new Map()

    /**
     * Creates an instance of BaseCommandManager class.
     * @param transpiler - Transpiler instance to use.
     */
    constructor(private transpiler: Transpiler) {}

    /**
     * Add a command into the cache.
     * @param command
     * @param loadType
     */
    private addCommand(
        command: Types extends string ? IRawCommand<Types> : Types,
        loadType = LoadCommandType.Main
    ) {
        const transpiledCommand = new TranspiledCommand(
            command,
            this.transpiler
        )

        transpiledCommand.setPath(loadType === LoadCommandType.Main ? null : command.path)

        this.cache.set(transpiledCommand.stringifiedName, transpiledCommand)
    }

    /**
     * Get the cached commands by type.
     * @param type - The command type.
     * @returns {TranspiledCommand<Types>[]}
     */
    public getType(type: Types) {
        return Array.from(this.cache.values()).filter((c) => c.type === type)
    }

    /**
     * Load commands from source.
     * @param path
     */
    public load(path: string) {
        const fileTree = collectFiles(path)

        for (const file of fileTree) {
            let data = require(file.dir)

            if (data.default) data = data.default;
            data = Array.isArray(data) ? data : [data]

            for (const command of data) {
                command.path = file.dir
                this.addCommand(command, LoadCommandType.Loader)
            }
        }
    }

    /**
     * Reload commands from source.
     * @returns {boolean}
     */
    public reload() {
        if (!this.#path) return Logger.error('Cannot find a commands directory.')

        const size = this.cache.size
        for (const command of this.cache.values()) {
            if (command.path === null) continue;

            this.cache.delete(command.stringifiedName)
        }

        return size !== this.cache.size
    }
}

/**
 * The default discord command manager.
 */
export class DiscordCommandManager extends BaseCommandManager<CommandTypes> {}
