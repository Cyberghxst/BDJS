import { BDJSCommand, DiscordCommandManager, LoadCommandType } from './Command'
import { Transpiler } from '@core/Transpiler'
import { Client } from 'discord.js'

export class DiscordClient extends Client {
    /**
     * BDJS code transpiler.
     */
    public readonly transpiler = new Transpiler()
    /**
     * The discord client command manager.
     */
    public readonly commands = new DiscordCommandManager(this.transpiler)

    /**
     * Add commands into the command manager.
     * @param commands - Commands to be cached.
     * @returns {DiscordClient}
     */
    public addCommand(...commands: BDJSCommand[]) {
        for (const command of commands) {
            this.commands['addCommand'](command, LoadCommandType.Main)
        }

        return this
    }
}