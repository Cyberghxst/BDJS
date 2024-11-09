"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const DiscordEventHandler_1 = require("@core/extended/DiscordEventHandler");
const Runtime_1 = require("@structures/Runtime");
const discord_js_1 = require("discord.js");
exports.default = new DiscordEventHandler_1.DiscordEventHandler({
    name: discord_js_1.Events.AutoModerationRuleUpdate,
    description: 'Fired when an automoderation rule is updated.',
    async call(oldRule, newRule) {
        const runtime = new Runtime_1.Runtime(newRule, this);
        const commands = this.commands.getType('automodRuleUpdate');
        if (commands.length === 0)
            return;
        for (const command of commands) {
            runtime.setState({ automod: { old: oldRule, new: newRule } });
            await command.call(runtime);
        }
    }
});
