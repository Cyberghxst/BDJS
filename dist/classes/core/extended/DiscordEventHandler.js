"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DiscordEventHandler = void 0;
const BaseEventHandler_1 = require("../BaseEventHandler");
/**
 * The default discord event handler.
 */
class DiscordEventHandler extends BaseEventHandler_1.BaseEventHandler {
    /**
     * Attach the event to the DiscordClient.
     * @param client - DiscordClient instance to attach the event to.
     * @returns {void}
     */
    attach(client) {
        client.on(this.name, this.call.bind(client));
    }
}
exports.DiscordEventHandler = DiscordEventHandler;
