"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const DiscordEventHandler_1 = require("@core/extended/DiscordEventHandler");
const Runtime_1 = require("@structures/Runtime");
const discord_js_1 = require("discord.js");
exports.default = new DiscordEventHandler_1.DiscordEventHandler({
    name: discord_js_1.Events.EntitlementUpdate,
    description: 'Fired when an entitlement is updated.',
    async call(oldEntitlement, newEntitlement) {
        const runtime = new Runtime_1.Runtime(newEntitlement, this);
        const commands = this.commands.getType('entitlementUpdate');
        if (commands.length === 0)
            return;
        for (const command of commands) {
            runtime.setState({ entitlement: { old: oldEntitlement, new: newEntitlement } });
            await command.call(runtime);
        }
    }
});
