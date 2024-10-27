import { BaseEventHandler } from '@core/BaseEventHandler'
import { ClientEvents } from 'discord.js'

/**
 * The default discord event handler.
 */
export class DiscordEventHandler<Events extends ClientEvents = ClientEvents, Name extends keyof Events = keyof Events> extends BaseEventHandler<Events, Name> {}