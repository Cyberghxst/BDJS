"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const DiscordEventHandler_1 = require("@core/extended/DiscordEventHandler");
const Runtime_1 = require("@structures/Runtime");
const discord_js_1 = require("discord.js");
exports.default = new DiscordEventHandler_1.DiscordEventHandler({
    name: discord_js_1.Events.ClientReady,
    description: 'Fired when client is ready.',
    async call() {
        // Process the prefixes.
        this['processPrefixes']();
        // Prevent the execution of commands if the
        // name isn't included in the events array.
        if (!this.extraOptions.events.includes('ready'))
            return;
        // Executing the commands.
        const runtime = new Runtime_1.Runtime({}, this);
        const commands = this.commands.getType('ready');
        if (commands.length === 0)
            return;
        for (const command of commands) {
            await command.call(runtime);
        }
    }
});
