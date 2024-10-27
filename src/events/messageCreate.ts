import { DiscordEventHandler } from '@core/extended/DiscordEventHandler'
import { Events } from 'discord.js'

export default new DiscordEventHandler({
    name: Events.MessageCreate,
    description: 'Fired when a message is created.',
    async call(message) {}
})