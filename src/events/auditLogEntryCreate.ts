import { DiscordEventHandler } from '@core/extended/DiscordEventHandler'
import { Runtime } from '@structures/Runtime'
import { Events } from 'discord.js'

export default new DiscordEventHandler({
    name: Events.GuildAuditLogEntryCreate,
    description: 'Fired when an audit log entry is created.',
    async call(entry) {
        const runtime = new Runtime(entry, this)
        const commands = this.commands.getType('auditLogEntryCreate')
        if (commands.length === 0) return;

        for (const command of commands) {
            await command.call(runtime);
        }
    }
})