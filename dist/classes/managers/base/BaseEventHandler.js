"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseEventHandler = void 0;
/**
 * Represents a base BDJS event handler.
 */
class BaseEventHandler {
    /**
     * Initializes a new instance of `BaseEventHandler`.
     * @param data - Event data to load to the instance.
     */
    constructor(data) {
        this.data = data;
    }
    /**
     * Attach the event to a listener.
     * @param client - DiscordClient reference.
     * @returns {void}
     */
    attach(client) { }
    /**
     * Returns the name of the event.
     */
    get name() {
        return this.data.name;
    }
    /**
     * Returns the executor of the event.
     */
    get call() {
        return this.data.call;
    }
}
exports.BaseEventHandler = BaseEventHandler;
