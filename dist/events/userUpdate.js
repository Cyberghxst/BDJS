"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const DiscordEventHandler_1 = require("../classes/core/extended/DiscordEventHandler");
const Runtime_1 = require("../classes/structures/Runtime");
const discord_js_1 = require("discord.js");
exports.default = new DiscordEventHandler_1.DiscordEventHandler({
    name: discord_js_1.Events.UserUpdate,
    description: 'Fired when an user is updated.',
    async call(oldUser, newUser) {
        const runtime = new Runtime_1.Runtime(newUser, this);
        const commands = this.commands.getType('userUpdate');
        if (commands.length === 0)
            return;
        for (const command of commands) {
            runtime.setState({ user: { old: oldUser, new: newUser } });
            await command.call(runtime);
        }
    }
});
