import { DiscordEventHandler } from '@core/extended/DiscordEventHandler'
import { Runtime } from '@structures/Runtime'
import { Events } from 'discord.js'

export default new DiscordEventHandler({
    name: Events.GuildMemberAdd,
    description: 'Fired when an user joins a guild.',
    async call(member) {
        const runtime = new Runtime(member, this)
        const commands = this.commands.getType('memberJoin')
        if (commands.length === 0) return;

        for (const command of commands) {
            await command.call(runtime);
        }
    }
})