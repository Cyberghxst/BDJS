import { BDJSCommand, DiscordCommandManager, LoadCommandType } from './Command'
import { Client, ClientEvents, ClientOptions } from 'discord.js'
import { Transpiler } from '@core/Transpiler'
import { EventManager } from '@core/EventManager'

/**
 * Setup options for prefix.
 */
interface PrefixSetupOptions<Compile extends boolean = boolean> {
    /**
     * The values to take as prefix.
     */
    values: string[]
    /**
     * Advanced options for prefix values.
     */
    advancedOptions?: {
        /**
         * Whether transpile prefix values.
         * @default false
         */
        transpileValues?: Compile
        /**
         * The indexes that should be transpiled only.
         */
        transpileIndexes?: Compile extends true ? number[] : never
    }
    /**
     * Whether take client mention as prefix.
     * @default false
     */
    mentionAsPrefix?: boolean
}

/**
 * The setup options of the Discord client.
 */
export interface DiscordClientSetupOptions extends ClientOptions {
    /**
     * Events the client must listen to.
     */
    events?: (keyof ClientEvents)[]
    /**
     * Prefix options for the Discord client.
     */
    prefixes: string | string[] | PrefixSetupOptions | null
}

/**
 * The class representing a Discord client.
 */
export class DiscordClient extends Client {
    /**
     * BDJS code transpiler.
     */
    public readonly transpiler = new Transpiler()
    /**
     * The discord client command manager.
     */
    public readonly commands = new DiscordCommandManager(this.transpiler)

    constructor(public extraOptions: DiscordClientSetupOptions) {
        super(extraOptions)
        this.#processPrefixes()
        EventManager.loadBuiltIns()
    }

    /**
     * Add commands into the command manager.
     * @param commands - Commands to be cached.
     * @returns {DiscordClient}
     */
    public addCommand(...commands: BDJSCommand[]) {
        for (const command of commands) {
            this.commands['addCommand'](command as any, LoadCommandType.Main)
        }

        return this
    }

    /**
     * Process the prefixes based on the given options.
     */
    #processPrefixes() {
        if (this.extraOptions.prefixes === null) return;

        if (typeof this.extraOptions.prefixes === 'string') {
            this.extraOptions.prefixes = [this.extraOptions.prefixes]
        } else if (Array.isArray(this.extraOptions.prefixes)) {
            this.extraOptions.prefixes = this.extraOptions.prefixes
        } else {
            const mentionAsPrefix = this.extraOptions.prefixes.mentionAsPrefix ?? false
            const transpileValues = this.extraOptions.prefixes.advancedOptions.transpileValues ?? false
            const transpileIndexes = Array.isArray(this.extraOptions.prefixes.advancedOptions.transpileIndexes) ? this.extraOptions.prefixes.advancedOptions.transpileIndexes : []
            let values = this.extraOptions.prefixes.values

            if (transpileValues && transpileIndexes.length === 0) {
                values = values.map((prefix) => this.transpiler.transpile(prefix, false))
            } else if (transpileValues && transpileIndexes.length > 0) {
                for (const index of transpileIndexes) {
                    values[index] = this.transpiler.transpile(values[index], false)
                }
            }

            if (mentionAsPrefix) {
                values.push(`<@${this.user.username}>`, `<@!${this.user.username}>`)
            }

            this.extraOptions.prefixes = values
        }
    }

    /**
     * Login the client to Discord.
     * @param token - The token to be used.
     * @returns {Promise<string>}
     */
    override login(token: string) {
        // Load the events.
        if (this.extraOptions.events.length) {
            EventManager.attach(this, 'built-ins', this.extraOptions.events)
        }

        return super.login(token)
    }
}