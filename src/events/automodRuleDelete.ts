import { DiscordEventHandler } from '@core/extended/DiscordEventHandler'
import { Runtime } from '@structures/Runtime'
import { Events } from 'discord.js'

export default new DiscordEventHandler({
    name: Events.AutoModerationRuleDelete,
    description: 'Fired when an automoderation rule is deleted.',
    async call(rule) {
        const runtime = new Runtime(rule, this)
        const commands = this.commands.getType('automodRuleDelete')
        if (commands.length === 0) return;

        for (const command of commands) {
            await command.call(runtime);
        }
    }
})