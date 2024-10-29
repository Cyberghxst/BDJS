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
    name: discord_js_1.Events.MessageCreate,
    description: 'Fired when a message is created.',
    async call(message) {
        const runtime = new Runtime_1.Runtime(message, this);
        const commands = this.commands.getType('prefixed');
        if (commands.length === 0)
            return;
        const prefixes = this.extraOptions.prefixes === null ? [] : this.extraOptions.prefixes;
        const prefix = prefixes.find((value) => message.content.startsWith(value));
        if (!prefix)
            return;
        const args = message.content.slice(prefix.length).trim().split(/ +/g);
        const commandName = args.shift();
        const command = commands.find((cmd) => cmd.name instanceof RegExp ? cmd.name.test(commandName) : cmd.name.toLowerCase() === commandName.toLowerCase());
        if (!command)
            return;
        runtime.setCommand(command).setArgs(args);
        let result = '';
        if (typeof command.code === 'function' && (0, types_1.isAsyncFunction)(command.code)) {
            const temporal = await command.code(runtime);
            if (typeof temporal === 'string')
                result += temporal;
        }
        else if (typeof command.code === 'function' && !(0, types_1.isAsyncFunction)(command.code)) {
            const temporal = command.code(runtime);
            if (typeof temporal === 'string')
                result += temporal;
        }
        else {
            const temporal = (0, runCode_1.default)(command.transpiledCode, runtime);
            if (typeof temporal === 'string' && temporal !== '')
                result += temporal;
        }
        if (command.sendResult && result !== '')
            message.channel.send(result);
    }
});
