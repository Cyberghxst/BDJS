import { DiscordEventHandler } from '@core/extended/DiscordEventHandler'
import { Runtime } from '@structures/Runtime'
import { Events } from 'discord.js'

export default new DiscordEventHandler({
    name: Events.GuildEmojiDelete,
    description: 'Fired when an emoji is deleted.',
    async call(emoji) {
        const runtime = new Runtime(emoji, this)
        const commands = this.commands.getType('emojiDelete')
        if (commands.length === 0) return;

        for (const command of commands) {
            await command.call(runtime);
        }
    }
})