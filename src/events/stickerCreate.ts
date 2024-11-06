import { DiscordEventHandler } from '@core/extended/DiscordEventHandler'
import { Runtime } from '@structures/Runtime'
import { Events } from 'discord.js'

export default new DiscordEventHandler({
    name: Events.GuildStickerCreate,
    description: 'Fired when an sticker is created.',
    async call(sticker) {
        const runtime = new Runtime(sticker, this)
        const commands = this.commands.getType('stickerCreate')
        if (commands.length === 0) return;

        for (const command of commands) {
            await command.call(runtime);
        }
    }
})