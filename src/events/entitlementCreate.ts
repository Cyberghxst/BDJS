import { BaseEvent } from '../structures/Event'
import { StringCommandTypes } from '../index'
import { Data } from '../structures/Data'
import { Entitlement } from 'discord.js'

const commandType: StringCommandTypes = 'entitlementCreate'
export default new BaseEvent<[Entitlement]>({
    name: 'onEntitlementCreate',
    description: 'Executed when an entitlements is created.',
    async listener(bot, env) {
        const commands = Array.from(bot.commands.values()).filter(cmd => cmd.type === commandType)
        const data = new Data({
            bot,
            commandType,
            env,
            functions: bot.functions,
            reader: bot.reader
        })
        for (const command of commands) {
            data.command = command
            await data.reader.compile(command.code, data)
        }
    }
})