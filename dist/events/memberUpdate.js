"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const DiscordEventHandler_1 = require("../classes/core/extended/DiscordEventHandler");
const Runtime_1 = require("../classes/structures/Runtime");
const discord_js_1 = require("discord.js");
exports.default = new DiscordEventHandler_1.DiscordEventHandler({
    name: discord_js_1.Events.GuildMemberUpdate,
    description: 'Fired when a guild member is updated.',
    async call(oldMember, newMember) {
        const runtime = new Runtime_1.Runtime(newMember, this);
        const commands = this.commands.getType('memberUpdate');
        if (commands.length === 0)
            return;
        for (const command of commands) {
            runtime.setState({ member: { old: oldMember, new: newMember } });
            await command.call(runtime);
        }
    }
});
