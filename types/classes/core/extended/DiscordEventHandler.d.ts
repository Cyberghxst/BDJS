import { BaseEventHandler } from '../BaseEventHandler';
import { DiscordClient } from '../../structures/DiscordClient';
import { ClientEvents } from 'discord.js';
/**
 * The default discord event handler.
 */
export declare class DiscordEventHandler<Events extends ClientEvents = ClientEvents, Name extends keyof Events = keyof Events> extends BaseEventHandler<Events, Name> {
    attach(client: DiscordClient): void;
}
