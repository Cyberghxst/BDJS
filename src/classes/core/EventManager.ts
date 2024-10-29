import { DiscordClient } from '@structures/DiscordClient'
import { type BaseEventHandler } from './BaseEventHandler'
import { collectFiles } from '@functions/collectFiles'

/**
 * The global event manager.
 */
export class EventManager {
    /**
     * Cached events in this manager.
     */
    static cache: Record<string, Record<string, BaseEventHandler>> = {}

    /**
     * Attach the events to the Discord Client.
     * @param client - Client to attach the events to.
     * @returns {void}
     */
    static attach(client: DiscordClient, name: string, events: string[]) {
        for (const [key, value] of Object.entries(this.cache[name])) {
            if (events.includes(key)) {
                value.attach(client)
            }
        }
    }

    /**
     * Load events from a path to the cache.
     * @param name - The name of the events cache.
     * @param path - The path to load the files from.
     */
    static load(name: string, path: string) {
        this.cache[name] = {}

        for (const file of collectFiles(path)) {
            const eventFile = require(file.dir).default as BaseEventHandler
            this.cache[name][eventFile.name] = eventFile
        }
    }

    /**
     * Cache the built-in events.
     */
    static loadBuiltIns() {
        EventManager.load('built-ins', `${__dirname}/../../events`)
    }
}
