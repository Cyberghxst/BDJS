"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const DiscordEventHandler_1 = require("@core/extended/DiscordEventHandler");
const Runtime_1 = require("@structures/Runtime");
const discord_js_1 = require("discord.js");
exports.default = new DiscordEventHandler_1.DiscordEventHandler({
    name: discord_js_1.Events.ChannelUpdate,
    description: 'Fired when a channel is updated.',
    async call(oldChannel, newChannel) {
        const runtime = new Runtime_1.Runtime(newChannel, this);
        const commands = this.commands.getType('channelUpdate');
        if (commands.length === 0)
            return;
        for (const command of commands) {
            runtime.setState({ channel: { old: oldChannel, new: newChannel } });
            await command.call(runtime);
        }
    }
});
