import { DiscordEventHandler } from '@core/extended/DiscordEventHandler'
import { Runtime } from '@structures/Runtime'
import { Events } from 'discord.js'

export default new DiscordEventHandler({
    name: Events.MessageReactionAdd,
    description: 'Fired when a reaction is added to a message.',
    async call(reaction) {
        const runtime = new Runtime(reaction, this)
        const commands = this.commands.getType('reactionAdd')
        if (commands.length === 0) return;

        for (const command of commands) {
            await command.call(runtime);
        }
    }
})