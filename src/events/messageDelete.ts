import { DiscordEventHandler } from '@core/extended/DiscordEventHandler'
import { Runtime } from '@structures/Runtime'
import { Events } from 'discord.js'

export default new DiscordEventHandler({
    name: Events.MessageDelete,
    description: 'Fired when a message is deleted.',
    async call(message) {
        const runtime = new Runtime(message, this)
        const commands = this.commands.getType('messageDelete')
        if (commands.length === 0) return;

        for (const command of commands) {
            await command.call(runtime);
        }
    }
})