import { BDJSCommand, DiscordCommandManager } from './Command';
import { Transpiler } from '../core/Transpiler';
import { Client } from 'discord.js';
export declare class DiscordClient extends Client {
    /**
     * BDJS code transpiler.
     */
    readonly transpiler: Transpiler;
    /**
     * The discord client command manager.
     */
    readonly commands: DiscordCommandManager;
    /**
     * Add commands into the command manager.
     * @param commands - Commands to be cached.
     * @returns {DiscordClient}
     */
    addCommand(...commands: BDJSCommand[]): this;
}
