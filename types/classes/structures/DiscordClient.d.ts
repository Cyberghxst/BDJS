import { BDJSCommand, DiscordCommandManager } from './Command';
import { Client, ClientEvents, ClientOptions } from 'discord.js';
import { Transpiler } from '../core/Transpiler';
/**
 * Setup options for prefix.
 */
interface PrefixSetupOptions<Compile extends boolean = boolean> {
    /**
     * The values to take as prefix.
     */
    values: string[];
    /**
     * Advanced options for prefix values.
     */
    advancedOptions?: {
        /**
         * Whether transpile prefix values.
         * @default false
         */
        transpileValues?: Compile;
        /**
         * The indexes that should be transpiled only.
         */
        transpileIndexes?: Compile extends true ? number[] : never;
    };
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
    #private;
    extraOptions: DiscordClientSetupOptions;
    /**
     * BDJS code transpiler.
     */
    readonly transpiler: Transpiler;
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
     * Login the client to Discord.
     * @param token - The token to be used.
     * @returns {Promise<string>}
     */
    login(token: string): Promise<string>;
}
export {};
