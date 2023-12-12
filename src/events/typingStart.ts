import { BaseEvent } from '../structures/Event'
import { Context } from '../structures/Context'
import { Data } from '../structures/Data'
import { Typing } from 'discord.js'

export default new BaseEvent<[Typing]>({
    name: 'onTypingStart',
    description: 'Executed when someone starts typing.',
    async listener(bot, typing) {
        const context = new Context(typing)
        const commands = bot.commands.filter(cmd => cmd.type === 'typing')
            const data = new Data({
                bot,
                context,
                commandType: 'typing',
                env: {},
                functions: bot.functions,
                instanceTime: new Date,
                reader: bot.reader
            })

            for (const command of commands) {
                await data.reader.compile(command.code, data)
            }
    }
})