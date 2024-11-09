"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const DiscordEventHandler_1 = require("@core/extended/DiscordEventHandler");
const Runtime_1 = require("@structures/Runtime");
const discord_js_1 = require("discord.js");
exports.default = new DiscordEventHandler_1.DiscordEventHandler({
    name: discord_js_1.Events.ThreadDelete,
    description: 'Fired when a thread is deleted.',
    async call(channel) {
        const runtime = new Runtime_1.Runtime(channel, this);
        const commands = this.commands.getType('threadDelete');
        if (commands.length === 0)
            return;
        for (const command of commands) {
            await command.call(runtime);
        }
    }
});
