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
exports.default = new DiscordEventHandler_1.DiscordEventHandler({
    name: discord_js_1.Events.PresenceUpdate,
    description: 'Fired when an user presence is updated.',
    async call(oldPresence, newPresence) {
        const runtime = new Runtime_1.Runtime(newPresence, this);
        const commands = this.commands.getType('presenceUpdate');
        if (commands.length === 0)
            return;
        for (const command of commands) {
            runtime.setCommand(command)
                .setState({
                presence: {
                    old: oldPresence,
                    new: newPresence
                }
            });
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
});
