import { BaseEventHandler } from '@core/BaseEventHandler'
import { DiscordClient } from '@structures/DiscordClient'
import { ClientEvents } from 'discord.js'

/**
 * The default discord event handler.
 */
export class DiscordEventHandler<Events extends ClientEvents = ClientEvents, Name extends keyof Events = keyof Events> extends BaseEventHandler<Events, Name> {
    /**
     * Attach the event to the DiscordClient.
     * @param client - DiscordClient instance to attach the event to.
     * @returns {void}
     */
    public attach(client: DiscordClient) {
        client.on(this.name as keyof ClientEvents, this.call.bind(client) as any)
    }
}