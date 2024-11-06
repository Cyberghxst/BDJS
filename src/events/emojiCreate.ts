import { DiscordEventHandler } from '@core/extended/DiscordEventHandler'
import { Runtime } from '@structures/Runtime'
import { Events } from 'discord.js'

export default new DiscordEventHandler({
    name: Events.GuildEmojiCreate,
    description: 'Fired when an emoji is created.',
    async call(emoji) {
        const runtime = new Runtime(emoji, this)
        const commands = this.commands.getType('emojiCreate')
        if (commands.length === 0) return;

        for (const command of commands) {
            await command.call(runtime);
        }
    }
})