import { DiscordEventHandler } from '@core/extended/DiscordEventHandler'
import { Runtime } from '@structures/Runtime'
import { Events } from 'discord.js'

export default new DiscordEventHandler({
    name: Events.MessageCreate,
    description: 'Fired when a message is created.',
    async call(message) {
        const runtime = new Runtime(message, this)
    }
})