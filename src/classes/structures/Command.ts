import { Transpiler } from '@core/Transpiler'
import { AsciiTable3 } from 'ascii-table3'
import { minify } from 'uglify-js'
import color from 'cli-color'
import { Logger } from '@core/Logger';
import { collectFiles } from '@functions/collectFiles';
import createString from '@functions/createString';

/**
 * Command types that Discord contexts provide.
 */
export type DiscordCommandTypes = 
    // Message-related events
    'prefixed' | 'unprefixed' | 'alwaysReply' | 'messageDelete' | 'messageUpdate'

    // Miscelaneous events.
    | 'error' | 'ready'

    // Interaction-related events.
    | 'anyInteraction' | 'modalInteraction' | 'buttonInteraction' | 'commandInteraction' | 'selectMenuInteraction' | 'userContextMenuInteraction' | 'messageContextMenuInteraction' | 'autocompleteInteraction'

    // Member create/leave events.
    | 'memberJoin' | 'memberLeave' | 'memberUpdate'

    // Reaction-related events.
    | 'reactionAdd' | 'reactionRemove'

    // Sticker-related events.
    | 'stickerCreate' | 'stickerDelete' | 'stickerUpdate'

    // Role-related events.
    | 'roleCreate' | 'roleDelete' | 'roleUpdate'

    // Bot guild create/leave events.
    | 'botJoin' | 'botLeave'

    // Channel-related events
    | 'channelCreate' | 'channelDelete' | 'channelUpdate'

    // Thread-related events.
    | 'threadCreate' | 'threadDelete' | 'threadUpdate'

    // Ban-related events.
    | 'banAdd' | 'banRemove'

    // Emoji-related events.
    | 'emojiCreate' | 'emojiDelete' | 'emojiUpdate'

    // User-related events.
    | 'presenceUpdate' | 'userUpdate'

    // Automod-related events.
    | 'automodRuleCreate' | 'automodRuleDelete' | 'automodRuleUpdate'

    // Entitlement-related events.
    | 'entitlementCreate' | 'entitlementUpdate' | 'entitlementDelete'

    // Typing-related events.
    | 'typingStart';

/**
 * Custom command types that BDJS provides.
 */
export type CustomCommandTypes = 'timeout' | 'interval';

/**
 * All command types provided by the library.
 */
export type CommandTypes = DiscordCommandTypes | CustomCommandTypes;

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
    type: string
    /**
     * The native code of this command.
     */
    code: string
    /**
     * The transpiled code of the command.
     */
    transpiled?: string | null
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
}

/**
 * A BDJS command.
 */
export interface BDJSCommand extends IRawCommand<CommandTypes> {}
/**
 * A BDJS transpiled command.
 */
type BDJSTranspiledCommand = BDJSCommand & { transpiled: string }

/**
 * Represents a transpiled command.
 */
export class TranspiledCommand<Types extends string | IRawCommand> {
    /**
     * Additional information about the command to be logged.
     */
    #logOptions: { pass: boolean, error: Error | undefined, warnings: string[] } = {
        pass: true,
        error: undefined,
        warnings: []
    }

    /**
     * Starts the command instance.
     */
    constructor(private data: Types extends string ? IRawCommand<Types> : Types, transpiler: Transpiler) {
        this.ensureMinification() // Ensure the minification option.
        this.ensureName() // Ensure the command name.

        // Transpiling the native code.
        let transpiledCode = transpiler.transpile(data.code)

        // Checking if it was transpiled.
        if (typeof transpiledCode === 'string') {
            // Minify the command
            if (data.minify) {
                const minified = minify(transpiledCode)

                // Assign the error if any.
                if (minified.error instanceof Error) {
                    this.#logOptions.error = minified.error
                    this.#logOptions.pass = false
                }

                // Assign the warning if any.
                if (Array.isArray(minified.warnings)) {
                    this.#logOptions.warnings = minified.warnings
                }

                // Assign the minified code.
                transpiledCode = minified.code
            } else {
                const beautified = minify(transpiledCode, {
                    compress: false,
                    mangle: false,
                    output: {
                        beautify: true
                    }
                })

                // Assign the error if any.
                if (beautified.error instanceof Error) {
                    this.#logOptions.error = beautified.error
                    this.#logOptions.pass = false
                }

                // Assign the warning if any.
                if (Array.isArray(beautified.warnings)) {
                    this.#logOptions.warnings = beautified.warnings
                }

                // Assign the beautified code.
                transpiledCode = beautified.code
            }

            // Assign the transpiled code to the command.
            data.transpiled = transpiledCode
        }
    }

    /**
     * Ensure the minification option in the command.
     * @returns {void}
     */
    public ensureMinification() {
        this.data.minify = typeof this.data.minify !== 'boolean' ? true : this.data.minify
    }

    /**
     * Ensure the command name.
     * @returns {void}
     */
    public ensureName() {
        this.data.name = this.data.name === undefined ? createString() : this.data.name
    }

    /**
     * Returns the load info for the log command table.
     */
    public get loadCommandInfo() {
        return [
            this.data.name instanceof RegExp ? this.data.name.source : this.data.name || 'Unknown',
            this.data.type,
            this.#logOptions.pass ? color.green('LOADED') : color.red('NOT LOADED'),
            this.data.path === null ? 'MAIN FILE' : AsciiTable3.truncateString(this.data.path, 20)
        ]
    }

    /**
     * Returns the name of this command.
     */
    public get name() {
        return this.data.name instanceof RegExp ? this.data.name.source : this.data.name || 'Unknown'
    }

    /**
     * Returns the command path.
     */
    public get path() {
        return this.data.path
    }
}

/**
 * Represents the load command source.
 */
export enum LoadCommandType {
    Loader,
    Main
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

    constructor(private transpiler: Transpiler) {}

    /**
     * Add a command into the cache.
     * @param command 
     * @param loadType 
     */
    private addCommand(command: Types extends string ? IRawCommand<Types> : Types, loadType = LoadCommandType.Main) {
        const transpiledCommand = new TranspiledCommand(command, this.transpiler)
        this.cache.set(transpiledCommand.name, transpiledCommand)
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
            if (command.path === null) continue

            this.cache.delete(command.name)
        }

        return size !== this.cache.size
    }
}

/**
 * The default discord command manager.
 */
export class DiscordCommandManager extends BaseCommandManager<CommandTypes> {}