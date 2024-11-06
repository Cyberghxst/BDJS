import { DiscordEventHandler } from '@core/extended/DiscordEventHandler'
import { Runtime } from '@structures/Runtime'
import { Events } from 'discord.js'

export default new DiscordEventHandler({
    name: Events.GuildCreate,
    description: 'Fired when the client joins a guild.',
    async call(guild) {
        const runtime = new Runtime(guild, this)
        const commands = this.commands.getType('clientJoin')
        if (commands.length === 0) return;

        for (const command of commands) {
            await command.call(runtime);
        }
    }
})