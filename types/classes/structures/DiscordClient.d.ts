import { BDJSCommand, DiscordCommandManager } from './Command';
import { Client, ClientOptions } from 'discord.js';
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
    login(token: string): Promise<string>;
}
export {};
