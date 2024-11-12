import { BDJSCommand, DiscordCommandManager, LoadCommandType } from './Command'
import { Client, ClientEvents, ClientOptions } from 'discord.js'
import { EventManager } from '@managers/EventManager'
import logCommands from '@functions/logCommands'
import ready from '../../events/ready'

/**
 * Setup options for prefix.
 */
interface PrefixSetupOptions<Compile extends boolean = boolean> {
    /**
     * The values to take as prefix.
     */
    values: string[]
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
     * The discord client command manager.
     */
    public readonly commands = new DiscordCommandManager()

    constructor(public extraOptions: DiscordClientSetupOptions) {
        super(extraOptions)
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
    private processPrefixes() {
        if (this.extraOptions.prefixes === null) return;

        if (typeof this.extraOptions.prefixes === 'string') {
            this.extraOptions.prefixes = [this.extraOptions.prefixes]
        } else if (Array.isArray(this.extraOptions.prefixes)) {
            this.extraOptions.prefixes = this.extraOptions.prefixes
        } else {
            const mentionAsPrefix = this.extraOptions.prefixes.mentionAsPrefix ?? false
            let values = this.extraOptions.prefixes.values

            if (mentionAsPrefix) {
                values.push(`<@${this.user!.username}>`, `<@!${this.user!.username}>`)
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
        if (this.extraOptions.events?.length) {
            EventManager.attach(this, 'built-ins', this.extraOptions.events)
        }

        // Attaching the ready event.
        ready.attach(this)

        // Log the cached commands.
        logCommands(this.commands)

        return super.login(token)
    }
}