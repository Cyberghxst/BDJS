import { DiscordEventHandler } from '@managers/extended/DiscordEventHandler'
import { Runtime } from '@structures/Runtime'
import { Events } from 'discord.js'

export default new DiscordEventHandler({
    name: Events.ClientReady,
    description: 'Fired when client is ready.',
    async call() {
        // Process the prefixes.
        this['processPrefixes']()

        // Prevent the execution of commands if the
        // name isn't included in the events array.
        if (!this.extraOptions.events?.includes('ready')) return;

        // Executing the commands.
        const runtime = new Runtime({}, this)
        const commands = this.commands.getType('ready')
        if (commands.length === 0) return;

        for (const command of commands) {
            await command.call(runtime);
        }
    }
})