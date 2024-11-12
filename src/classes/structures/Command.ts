import { collectFiles } from '@functions/collectFiles'
import createString from '@functions/createString'
import { isAsyncFunction } from 'node:util/types'
import logCommands from '@functions/logCommands'
import { AsciiTable3 } from 'ascii-table3'
import { Logger } from '@core/Logger'
import { Runtime } from './Runtime'
import { minify } from 'uglify-js'
import color from 'cli-color'
import { InstructionToken, Lexer } from '@core/Lexer'

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
    code: string
    /**
     * The transpiled code of the command.
     */
    compiled?: InstructionToken[] | null
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
type BDJSFormedCommand = BDJSCommand & { compiled: InstructionToken[] }

/**
 * Represents a transpiled command.
 */
export class FormedCommand<Types extends string | IRawCommand> {
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
        private data: Types extends string ? IRawCommand<Types> : Types
    ) {
        this.ensureMinification(); // Ensure the minification option.
        this.ensureName(); // Ensure the command name.

        data.compiled = new Lexer(data.code).toAST()
    }

    /**
     * Call this command.
     * @param runtime - Runtime context to be used.
     */
    public async call(runtime: Runtime) {
        runtime.setCommand<CommandTypes>(this as FormedCommand<any>)

        /*if (isAsyncFunction(this.code)) {
            await this.code(runtime);
        } else if (!isAsyncFunction(this.code)) {
            this.code(runtime);
        }*/
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
        return this.data.code
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
    public get compiled() {
        return this.data.compiled as InstructionToken[]
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
    public cache: Map<string, FormedCommand<Types>> = new Map()

    /**
     * Creates an instance of BaseCommandManager class.
     * @param transpiler - Transpiler instance to use.
     */
    constructor() {}

    /**
     * Add a command into the cache.
     * @param command
     * @param loadType
     */
    private addCommand(
        command: Types extends string ? IRawCommand<Types> : Types,
        loadType = LoadCommandType.Main
    ) {
        const transpiledCommand = new FormedCommand(command)

        transpiledCommand.setPath(loadType === LoadCommandType.Main ? null : command.path)

        this.cache.set(transpiledCommand.stringifiedName, transpiledCommand)
    }

    /**
     * Get the cached commands by type.
     * @param type - The command type.
     * @returns {FormedCommand<Types>[]}
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

        this.load(this.#path)
        logCommands(this)
        
        return size !== this.cache.size
    }
}

/**
 * The default discord command manager.
 */
export class DiscordCommandManager extends BaseCommandManager<CommandTypes> {}