import { DiscordEventHandler } from '@core/extended/DiscordEventHandler'
import { Runtime } from '@structures/Runtime'
import { Events } from 'discord.js'

export default new DiscordEventHandler({
    name: Events.MessageUpdate,
    description: 'Fired when a message is updated.',
    async call(oldMessage, newMessage) {
        const runtime = new Runtime(newMessage, this)
        const commands = this.commands.getType('messageUpdate')
        if (commands.length === 0) return;

        for (const command of commands) {
            runtime.setState({ message: { old: oldMessage, new: newMessage } });
            await command.call(runtime);
        }
    }
})