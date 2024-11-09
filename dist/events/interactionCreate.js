"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const DiscordEventHandler_1 = require("../classes/core/extended/DiscordEventHandler");
const Runtime_1 = require("../classes/structures/Runtime");
const discord_js_1 = require("discord.js");
async function runInteractionType(commandType, runtime) {
    const commands = this.commands.getType(commandType);
    if (commands.length === 0)
        return;
    for (const command of commands) {
        await command.call(runtime);
    }
}
exports.default = new DiscordEventHandler_1.DiscordEventHandler({
    name: discord_js_1.Events.InteractionCreate,
    description: 'Fired when an interaction is created.',
    async call(interaction) {
        const runtime = new Runtime_1.Runtime(interaction, this);
        if (interaction.isAnySelectMenu()) {
            await runInteractionType.call(this, 'selectMenuInteraction', runtime);
        }
        else if (interaction.isAutocomplete()) {
            await runInteractionType.call(this, 'autocompleteInteraction', runtime);
        }
        else if (interaction.isButton()) {
            await runInteractionType.call(this, 'buttonInteraction', runtime);
        }
        else if (interaction.isChatInputCommand()) {
            await runInteractionType.call(this, 'commandInteraction', runtime);
        }
        else if (interaction.isModalSubmit()) {
            await runInteractionType.call(this, 'modalInteraction', runtime);
        }
        else if (interaction.isMessageContextMenuCommand()) {
            await runInteractionType.call(this, 'messageContextMenuInteraction', runtime);
        }
        else if (interaction.isUserContextMenuCommand()) {
            await runInteractionType.call(this, 'userContextMenuInteraction', runtime);
        }
        await runInteractionType.call(this, 'anyInteraction', runtime);
    }
});
