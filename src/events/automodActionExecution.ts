import { DiscordEventHandler } from '@core/extended/DiscordEventHandler'
import { Runtime } from '@structures/Runtime'
import { Events } from 'discord.js'

export default new DiscordEventHandler({
    name: Events.AutoModerationActionExecution,
    description: 'Fired when an automoderation action is executed.',
    async call(action) {
        const runtime = new Runtime(action, this)
        const commands = this.commands.getType('automodActionExecution')
        if (commands.length === 0) return;

        for (const command of commands) {
            await command.call(runtime);
        }
    }
})