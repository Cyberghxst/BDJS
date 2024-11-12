import { BDJSCommand, DiscordCommandManager } from './Command';
import { Client, ClientEvents, ClientOptions } from 'discord.js';
/**
 * Setup options for prefix.
 */
interface PrefixSetupOptions<Compile extends boolean = boolean> {
    /**
     * The values to take as prefix.
     */
    values: string[];
    /**
     * Whether take client mention as prefix.
     * @default false
     */
    mentionAsPrefix?: boolean;
}
/**
 * The setup options of the Discord client.
 */
export interface DiscordClientSetupOptions extends ClientOptions {
    /**
     * Events the client must listen to.
     */
    events?: (keyof ClientEvents)[];
    /**
     * Prefix options for the Discord client.
     */
    prefixes: string | string[] | PrefixSetupOptions | null;
}
/**
 * The class representing a Discord client.
 */
export declare class DiscordClient extends Client {
    extraOptions: DiscordClientSetupOptions;
    /**
     * The discord client command manager.
     */
    readonly commands: DiscordCommandManager;
    constructor(extraOptions: DiscordClientSetupOptions);
    /**
     * Add commands into the command manager.
     * @param commands - Commands to be cached.
     * @returns {DiscordClient}
     */
    addCommand(...commands: BDJSCommand[]): this;
    /**
     * Process the prefixes based on the given options.
     */
    private processPrefixes;
    /**
     * Login the client to Discord.
     * @param token - The token to be used.
     * @returns {Promise<string>}
     */
    login(token: string): Promise<string>;
}
export {};
