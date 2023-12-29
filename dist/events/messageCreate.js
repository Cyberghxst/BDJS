"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Context_1 = require("../structures/Context");
const Event_1 = require("../structures/Event");
const Data_1 = require("../structures/Data");
exports.default = new Event_1.BaseEvent({
    name: 'onMessageCreate',
    description: 'Executed when a message is created.',
    async listener(bot, message) {
        const replyBots = bot.extraOptions.replyBots ?? false;
        if (replyBots === false && message.author.bot)
            return;
        const context = new Context_1.Context(message, bot);
        const unprefixed = Array.from(bot.commands.values()).filter(command => command.type === 'unprefixed');
        const prefixed = Array.from(bot.commands.values()).filter(command => command.type === 'prefixed');
        const always = Array.from(bot.commands.values()).filter(command => command.type === 'always');
        // Always reply commands.
        for (const command of always) {
            const data = new Data_1.Data({
                bot,
                context,
                command,
                env: {
                    '__BDJS__ARGS__': message.content.split(/ +/g)
                },
                commandType: 'always',
                functions: bot.functions,
                reader: bot.reader,
            });
            const compiled = await data.reader.compile(command.code, data);
            if (compiled.code !== '')
                await message.channel.send(compiled.code);
        }
        // Unprefixed commands.
        {
            const args = message.content.split(/ +/g);
            const commandName = args.shift()?.toLowerCase() ?? '';
            const command = unprefixed.find(cmd => cmd.name === commandName || cmd.aliases?.includes(commandName));
            if (command) {
                const data = new Data_1.Data({
                    bot,
                    context,
                    command,
                    commandType: 'unprefixed',
                    env: {
                        '__BDJS__ARGS__': args
                    },
                    functions: bot.functions,
                    reader: bot.reader,
                });
                const compiled = await data.reader.compile(command.code, data);
                if (compiled.code !== '')
                    await message.channel.send(compiled.code);
            }
        }
        // Prefixed commands.
        let args = message.content.split(/ +/g);
        const data = new Data_1.Data({
            bot,
            context,
            commandType: 'prefixed',
            env: {
                '__BDJS__ARGS__': args
            },
            functions: bot.functions,
            reader: bot.reader,
        });
        let prefixes = [];
        for (const prefix of bot.extraOptions.prefixes) {
            const compiled = await data.reader.compile(prefix, data);
            prefixes.push(compiled.code.toLowerCase());
        }
        prefixes = bot.extraOptions.mentionPrefix === true ? [...prefixes, `<@${bot.user.id}>`, `<@!${bot.user.id}>`] : prefixes;
        const prefix = prefixes.find(prx => args.at(0)?.toLowerCase().startsWith(prx))?.trim();
        if (!prefix)
            return;
        const commandName = args.at(0)?.toLowerCase() === prefix ? args[1]?.toLowerCase() : args.shift()?.toLowerCase().slice(prefix.length);
        if (args.at(0)?.toLowerCase() === prefix)
            args = args.slice(2);
        if (!commandName)
            return;
        const command = prefixed.find(cmd => cmd.name?.toLowerCase() === commandName || cmd.aliases?.includes(commandName));
        if (command) {
            data.command = command;
            const compiled = await data.reader.compile(command.code, data);
            if (compiled.code !== '')
                await message.channel.send(compiled.code);
        }
    }
});