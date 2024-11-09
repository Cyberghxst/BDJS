"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const DiscordEventHandler_1 = require("@core/extended/DiscordEventHandler");
const Runtime_1 = require("@structures/Runtime");
const discord_js_1 = require("discord.js");
exports.default = new DiscordEventHandler_1.DiscordEventHandler({
    name: discord_js_1.Events.GuildRoleUpdate,
    description: 'Fired when a role is updated.',
    async call(oldRole, newRole) {
        const runtime = new Runtime_1.Runtime(newRole, this);
        const commands = this.commands.getType('roleUpdate');
        if (commands.length === 0)
            return;
        for (const command of commands) {
            runtime.setState({ role: { old: oldRole, new: newRole } });
            await command.call(runtime);
        }
    }
});
