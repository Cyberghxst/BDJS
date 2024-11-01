"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const DiscordEventHandler_1 = require("../classes/core/extended/DiscordEventHandler");
const Runtime_1 = require("../classes/structures/Runtime");
const types_1 = require("util/types");
const runCode_1 = __importDefault(require("../utils/functions/runCode"));
const discord_js_1 = require("discord.js");
async function runInteractionType(commandType, runtime) {
    const commands = this.commands.getType(commandType);
    if (commands.length === 0)
        return;
    for (const command of commands) {
        runtime.setCommand(command);
        if (typeof command.code === 'function' && (0, types_1.isAsyncFunction)(command.code)) {
            await command.code(runtime);
        }
        else if (typeof command.code === 'function' && !(0, types_1.isAsyncFunction)(command.code)) {
            command.code(runtime);
        }
        else {
            (0, runCode_1.default)(command.transpiledCode, runtime);
        }
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