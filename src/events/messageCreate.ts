import { DiscordEventHandler } from '@core/extended/DiscordEventHandler'
import { Runtime } from '@structures/Runtime'
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

        runtime.setArgs(args)
        let result: any = await command.call(runtime);

        if (command.sendResult && result !== '') message.channel.send(result);
    }
})