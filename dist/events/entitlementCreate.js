"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const DiscordEventHandler_1 = require("../classes/core/extended/DiscordEventHandler");
const Runtime_1 = require("../classes/structures/Runtime");
const discord_js_1 = require("discord.js");
exports.default = new DiscordEventHandler_1.DiscordEventHandler({
    name: discord_js_1.Events.EntitlementCreate,
    description: 'Fired when an entitlement is created.',
    async call(entitlement) {
        const runtime = new Runtime_1.Runtime(entitlement, this);
        const commands = this.commands.getType('entitlementCreate');
        if (commands.length === 0)
            return;
        for (const command of commands) {
            await command.call(runtime);
        }
    }
});
