"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const DiscordEventHandler_1 = require("@core/extended/DiscordEventHandler");
const Runtime_1 = require("@structures/Runtime");
const discord_js_1 = require("discord.js");
exports.default = new DiscordEventHandler_1.DiscordEventHandler({
    name: discord_js_1.Events.AutoModerationActionExecution,
    description: 'Fired when an automoderation action is executed.',
    async call(action) {
        const runtime = new Runtime_1.Runtime(action, this);
        const commands = this.commands.getType('automodActionExecution');
        if (commands.length === 0)
            return;
        for (const command of commands) {
            await command.call(runtime);
        }
    }
});
