"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const DiscordEventHandler_1 = require("../classes/core/extended/DiscordEventHandler");
const Runtime_1 = require("../classes/structures/Runtime");
const discord_js_1 = require("discord.js");
exports.default = new DiscordEventHandler_1.DiscordEventHandler({
    name: discord_js_1.Events.GuildEmojiUpdate,
    description: 'Fired when an emoji is updated.',
    async call(oldEmoji, newEmoji) {
        const runtime = new Runtime_1.Runtime(newEmoji, this);
        const commands = this.commands.getType('emojiUpdate');
        if (commands.length === 0)
            return;
        for (const command of commands) {
            runtime.setState({ emoji: { old: oldEmoji, new: newEmoji } });
            await command.call(runtime);
        }
    }
});
