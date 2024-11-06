import { DiscordEventHandler } from '@core/extended/DiscordEventHandler'
import { Runtime } from '@structures/Runtime'
import { Events } from 'discord.js'

export default new DiscordEventHandler({
    name: Events.TypingStart,
    description: 'Fired when a someone starts typing.',
    async call(typing) {
        const runtime = new Runtime(typing, this)
        const commands = this.commands.getType('typingStart')
        if (commands.length === 0) return;

        for (const command of commands) {
            await command.call(runtime);
        }
    }
})