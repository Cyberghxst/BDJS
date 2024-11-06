import { DiscordEventHandler } from '@core/extended/DiscordEventHandler'
import { Runtime } from '@structures/Runtime'
import { Events } from 'discord.js'

export default new DiscordEventHandler({
    name: Events.UserUpdate,
    description: 'Fired when an user is updated.',
    async call(oldUser, newUser) {
        const runtime = new Runtime(newUser, this)
        const commands = this.commands.getType('userUpdate')
        if (commands.length === 0) return;

        for (const command of commands) {
            runtime.setState({ user: { old: oldUser, new: newUser } });
            await command.call(runtime);
        }
    }
})