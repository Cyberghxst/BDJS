import { DiscordEventHandler } from '@core/extended/DiscordEventHandler'
import { Runtime } from '@structures/Runtime'
import { Events } from 'discord.js'

export default new DiscordEventHandler({
    name: Events.ChannelDelete,
    description: 'Fired when a channel is deleted.',
    async call(channel) {
        const runtime = new Runtime(channel, this)
        const commands = this.commands.getType('channelDelete')
        if (commands.length === 0) return;

        for (const command of commands) {
            await command.call(runtime);
        }
    }
})