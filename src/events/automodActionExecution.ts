import { DiscordEventHandler } from '@core/extended/DiscordEventHandler'
import { CommandTypes } from '@structures/Command'
import { Runtime } from '@structures/Runtime'
import { isAsyncFunction } from 'util/types'
import runCode from '@functions/runCode'
import { Events } from 'discord.js'

export default new DiscordEventHandler({
    name: Events.AutoModerationActionExecution,
    description: 'Fired when an automoderation action is executed.',
    async call(action) {
        const runtime = new Runtime(action, this)
        const commands = this.commands.getType('automodActionExecution')
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