"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventManager = void 0;
const collectFiles_1 = require("../../utils/functions/collectFiles");
/**
 * The global event manager.
 */
class EventManager {
    /**
     * Attach the events to the Discord Client.
     * @param client - Client to attach the events to.
     * @returns {void}
     */
    static attach(client, name, events) {
        for (const [key, value] of Object.entries(this.cache[name])) {
            // Skipping the ready event.
            if (name === 'built-ins' && key === 'ready')
                continue;
            // Attaching the event.
            if (events.includes(key)) {
                value.attach(client);
            }
        }
    }
    /**
     * Load events from a path to the cache.
     * @param name - The name of the events cache.
     * @param path - The path to load the files from.
     */
    static load(name, path) {
        this.cache[name] = {};
        for (const file of (0, collectFiles_1.collectFiles)(path)) {
            const eventFile = require(file.dir).default;
            this.cache[name][eventFile.name] = eventFile;
        }
    }
    /**
     * Cache the built-in events.
     */
    static loadBuiltIns() {
        EventManager.load('built-ins', `${__dirname}/../../events`);
    }
}
exports.EventManager = EventManager;
/**
 * Cached events in this manager.
 */
EventManager.cache = {};
