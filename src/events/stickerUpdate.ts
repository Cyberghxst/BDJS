import { DiscordEventHandler } from '@core/extended/DiscordEventHandler'
import { CommandTypes } from '@structures/Command'
import { Runtime } from '@structures/Runtime'
import { isAsyncFunction } from 'util/types'
import runCode from '@functions/runCode'
import { Events } from 'discord.js'

export default new DiscordEventHandler({
    name: Events.GuildStickerUpdate,
    description: 'Fired when an sticker is updated.',
    async call(oldSticker, newSticker) {
        const runtime = new Runtime(newSticker, this)
        const commands = this.commands.getType('stickerUpdate')
        if (commands.length === 0) return;

        for (const command of commands) {
            runtime.setCommand<CommandTypes>(command)
            .setState({
                sticker: {
                    old: oldSticker,
                    new: newSticker
                }
            });
            
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