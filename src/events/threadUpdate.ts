import { DiscordEventHandler } from '@core/extended/DiscordEventHandler'
import { Runtime } from '@structures/Runtime'
import { Events } from 'discord.js'

export default new DiscordEventHandler({
    name: Events.ThreadUpdate,
    description: 'Fired when a thread is updated.',
    async call(oldChannel, newChannel) {
        const runtime = new Runtime(newChannel, this)
        const commands = this.commands.getType('threadUpdate')
        if (commands.length === 0) return;

        for (const command of commands) {
            runtime.setState({ channel: { old: oldChannel, new: newChannel } });
            await command.call(runtime);
        }
    }
})