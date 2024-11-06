import { DiscordEventHandler } from '@core/extended/DiscordEventHandler'
import { Runtime } from '@structures/Runtime'
import { Events } from 'discord.js'

export default new DiscordEventHandler({
    name: Events.GuildEmojiUpdate,
    description: 'Fired when an emoji is updated.',
    async call(oldEmoji, newEmoji) {
        const runtime = new Runtime(newEmoji, this)
        const commands = this.commands.getType('emojiUpdate')
        if (commands.length === 0) return;

        for (const command of commands) {
            runtime.setState({ emoji: { old: oldEmoji, new: newEmoji } });
            await command.call(runtime);
        }
    }
})