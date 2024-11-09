"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const DiscordEventHandler_1 = require("@core/extended/DiscordEventHandler");
const Runtime_1 = require("@structures/Runtime");
const discord_js_1 = require("discord.js");
exports.default = new DiscordEventHandler_1.DiscordEventHandler({
    name: discord_js_1.Events.MessageUpdate,
    description: 'Fired when a message is updated.',
    async call(oldMessage, newMessage) {
        const runtime = new Runtime_1.Runtime(newMessage, this);
        const commands = this.commands.getType('messageUpdate');
        if (commands.length === 0)
            return;
        for (const command of commands) {
            runtime.setState({ message: { old: oldMessage, new: newMessage } });
            await command.call(runtime);
        }
    }
});
