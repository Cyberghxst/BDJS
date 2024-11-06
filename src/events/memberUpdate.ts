import { DiscordEventHandler } from '@core/extended/DiscordEventHandler'
import { Runtime } from '@structures/Runtime'
import { Events } from 'discord.js'

export default new DiscordEventHandler({
    name: Events.GuildMemberUpdate,
    description: 'Fired when a guild member is updated.',
    async call(oldMember, newMember) {
        const runtime = new Runtime(newMember, this)
        const commands = this.commands.getType('memberUpdate')
        if (commands.length === 0) return;

        for (const command of commands) {
            runtime.setState({ member: { old: oldMember, new: newMember } });
            await command.call(runtime);
        }
    }
})