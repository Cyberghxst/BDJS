"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const DiscordEventHandler_1 = require("@core/extended/DiscordEventHandler");
const Runtime_1 = require("@structures/Runtime");
const discord_js_1 = require("discord.js");
exports.default = new DiscordEventHandler_1.DiscordEventHandler({
    name: discord_js_1.Events.PresenceUpdate,
    description: 'Fired when an user presence is updated.',
    async call(oldPresence, newPresence) {
        const runtime = new Runtime_1.Runtime(newPresence, this);
        const commands = this.commands.getType('presenceUpdate');
        if (commands.length === 0)
            return;
        for (const command of commands) {
            runtime.setState({ presence: { old: oldPresence, new: newPresence } });
            await command.call(runtime);
        }
    }
});
