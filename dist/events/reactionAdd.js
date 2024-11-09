"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const DiscordEventHandler_1 = require("../classes/core/extended/DiscordEventHandler");
const Runtime_1 = require("../classes/structures/Runtime");
const discord_js_1 = require("discord.js");
exports.default = new DiscordEventHandler_1.DiscordEventHandler({
    name: discord_js_1.Events.MessageReactionAdd,
    description: 'Fired when a reaction is added to a message.',
    async call(reaction) {
        const runtime = new Runtime_1.Runtime(reaction, this);
        const commands = this.commands.getType('reactionAdd');
        if (commands.length === 0)
            return;
        for (const command of commands) {
            await command.call(runtime);
        }
    }
});
