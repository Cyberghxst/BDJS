import { DiscordEventHandler } from '@core/extended/DiscordEventHandler'
import { Runtime } from '@structures/Runtime'
import { Events } from 'discord.js'

export default new DiscordEventHandler({
    name: Events.GuildStickerDelete,
    description: 'Fired when an sticker is deleted.',
    async call(sticker) {
        const runtime = new Runtime(sticker, this)
        const commands = this.commands.getType('stickerDelete')
        if (commands.length === 0) return;

        for (const command of commands) {
            await command.call(runtime);
        }
    }
})