import { DiscordEventHandler } from '@core/extended/DiscordEventHandler'
import { CommandTypes } from '@structures/Command'
import { Runtime } from '@structures/Runtime'
import { isAsyncFunction } from 'util/types'
import runCode from '@functions/runCode'
import { Events } from 'discord.js'

export default new DiscordEventHandler({
    name: Events.MessageUpdate,
    description: 'Fired when a message is updated.',
    async call(oldMessage, newMessage) {
        const runtime = new Runtime(newMessage, this)
        const commands = this.commands.getType('messageUpdate')
        if (commands.length === 0) return;

        for (const command of commands) {
            runtime.setCommand<CommandTypes>(command)
            .setState({
                message: {
                    old: oldMessage,
                    new: newMessage
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