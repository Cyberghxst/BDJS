import { DiscordEventHandler } from '@core/extended/DiscordEventHandler'
import { Runtime } from '@structures/Runtime'
import { Events } from 'discord.js'

export default new DiscordEventHandler({
    name: Events.GuildBanAdd,
    description: 'Fired when a ban is created.',
    async call(ban) {
        const runtime = new Runtime(ban, this)
        const commands = this.commands.getType('banAdd')
        if (commands.length === 0) return;

        for (const command of commands) {
            await command.call(runtime);
        }
    }
})