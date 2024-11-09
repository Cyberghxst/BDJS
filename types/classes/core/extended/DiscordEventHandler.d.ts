import { BaseEventHandler } from '../BaseEventHandler';
import { DiscordClient } from '../../structures/DiscordClient';
import { ClientEvents } from 'discord.js';
/**
 * The default discord event handler.
 */
export declare class DiscordEventHandler<Events extends ClientEvents = ClientEvents, Name extends keyof Events = keyof Events> extends BaseEventHandler<Events, Name> {
    /**
     * Attach the event to the DiscordClient.
     * @param client - DiscordClient instance to attach the event to.
     * @returns {void}
     */
    attach(client: DiscordClient): void;
}
