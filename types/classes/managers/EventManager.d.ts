import { type BaseEventHandler } from './base/BaseEventHandler';
import { DiscordClient } from '../structures/DiscordClient';
/**
 * The global event manager.
 */
export declare class EventManager {
    /**
     * Cached events in this manager.
     */
    static cache: Record<string, Record<string, BaseEventHandler>>;
    /**
     * Attach the events to the Discord Client.
     * @param client - Client to attach the events to.
     * @returns {void}
     */
    static attach(client: DiscordClient, name: string, events: string[]): void;
    /**
     * Load events from a path to the cache.
     * @param name - The name of the events cache.
     * @param path - The path to load the files from.
     */
    static load(name: string, path: string): void;
    /**
     * Cache the built-in events.
     */
    static loadBuiltIns(): void;
}
