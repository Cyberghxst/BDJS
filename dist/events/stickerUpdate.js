"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const DiscordEventHandler_1 = require("@core/extended/DiscordEventHandler");
const Runtime_1 = require("@structures/Runtime");
const discord_js_1 = require("discord.js");
exports.default = new DiscordEventHandler_1.DiscordEventHandler({
    name: discord_js_1.Events.GuildStickerUpdate,
    description: 'Fired when an sticker is updated.',
    async call(oldSticker, newSticker) {
        const runtime = new Runtime_1.Runtime(newSticker, this);
        const commands = this.commands.getType('stickerUpdate');
        if (commands.length === 0)
            return;
        for (const command of commands) {
            runtime.setState({ sticker: { old: oldSticker, new: newSticker } });
            await command.call(runtime);
        }
    }
});
