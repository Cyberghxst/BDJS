import { DiscordEventHandler } from '@core/extended/DiscordEventHandler'
import { Runtime } from '@structures/Runtime'
import { Events } from 'discord.js'

export default new DiscordEventHandler({
    name: Events.GuildRoleUpdate,
    description: 'Fired when a role is updated.',
    async call(oldRole, newRole) {
        const runtime = new Runtime(newRole, this)
        const commands = this.commands.getType('roleUpdate')
        if (commands.length === 0) return;

        for (const command of commands) {
            runtime.setState({ role: { old: oldRole, new: newRole } });
            await command.call(runtime);
        }
    }
})