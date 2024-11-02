import { DiscordEventHandler } from '@core/extended/DiscordEventHandler'
import { CommandTypes } from '@structures/Command'
import { Runtime } from '@structures/Runtime'
import { isAsyncFunction } from 'util/types'
import runCode from '@functions/runCode'
import { Events } from 'discord.js'

export default new DiscordEventHandler({
    name: Events.GuildBanRemove,
    description: 'Fired when a ban is removed.',
    async call(ban) {
        const runtime = new Runtime(ban, this)
        const commands = this.commands.getType('banRemove')
        if (commands.length === 0) return;

        for (const command of commands) {
            runtime.setCommand<CommandTypes>(command)
            if (typeof command.code === 'function' && isAsyncFunction(command.code)) {
                await command.code(runtime);
            } else if (typeof command.code === 'function' && !isAsyncFunction(command.code)) {
                command.code(runtime);
            } else {
                runCode(command.transpiledCode, runtime)
            }
        }
    }
})