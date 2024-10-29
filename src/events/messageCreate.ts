import { DiscordEventHandler } from '@core/extended/DiscordEventHandler'
import { CommandTypes } from '@structures/Command'
import { Runtime } from '@structures/Runtime'
import { isAsyncFunction } from 'util/types'
import runCode from '@functions/runCode'
import { Events } from 'discord.js'

export default new DiscordEventHandler({
    name: Events.MessageCreate,
    description: 'Fired when a message is created.',
    async call(message) {
        const runtime = new Runtime(message, this)
        const commands = this.commands.getType('prefixed')
        if (commands.length === 0) return;

        const prefixes: string[] = this.extraOptions.prefixes === null ? [] : this.extraOptions.prefixes as string[]
        const prefix: string | undefined = prefixes.find((value) => message.content.startsWith(value))
        if (!prefix) return;

        const args = message.content.slice(prefix.length).trim().split(/ +/g)
        const commandName = args.shift()!
        const command = commands.find((cmd) => cmd.name instanceof RegExp ? cmd.name.test(commandName) : cmd.name.toLowerCase() === commandName.toLowerCase())
        if (!command) return;

        runtime.setCommand<CommandTypes>(command)
        let result = ''
        if (typeof command.code === 'function' && isAsyncFunction(command.code)) {
            const temporal = await command.code(runtime)
            if (typeof temporal === 'string') result += temporal;
        } else if (typeof command.code === 'function' && !isAsyncFunction(command.code)) {
            const temporal = command.code(runtime)
            if (typeof temporal === 'string') result += temporal;
        } else {
            const temporal = runCode(command.transpiledCode, runtime)
            if (typeof temporal === 'string' && temporal !== '') result += temporal;
        }

        if (result !== '') message.channel.send(result);
    }
})