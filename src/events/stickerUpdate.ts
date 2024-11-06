import { DiscordEventHandler } from '@core/extended/DiscordEventHandler'
import { Runtime } from '@structures/Runtime'
import { Events } from 'discord.js'

export default new DiscordEventHandler({
    name: Events.GuildStickerUpdate,
    description: 'Fired when an sticker is updated.',
    async call(oldSticker, newSticker) {
        const runtime = new Runtime(newSticker, this)
        const commands = this.commands.getType('stickerUpdate')
        if (commands.length === 0) return;

        for (const command of commands) {
            runtime.setState({ sticker: { old: oldSticker, new: newSticker } });
            await command.call(runtime);
        }
    }
})