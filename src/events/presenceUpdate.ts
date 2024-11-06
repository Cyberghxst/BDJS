import { DiscordEventHandler } from '@core/extended/DiscordEventHandler'
import { Runtime } from '@structures/Runtime'
import { Events } from 'discord.js'

export default new DiscordEventHandler({
    name: Events.PresenceUpdate,
    description: 'Fired when an user presence is updated.',
    async call(oldPresence, newPresence) {
        const runtime = new Runtime(newPresence, this)
        const commands = this.commands.getType('presenceUpdate')
        if (commands.length === 0) return;

        for (const command of commands) {
            runtime.setState({ presence: { old: oldPresence, new: newPresence } });
            await command.call(runtime);
        }
    }
})