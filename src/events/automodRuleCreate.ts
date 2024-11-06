import { DiscordEventHandler } from '@core/extended/DiscordEventHandler'
import { Runtime } from '@structures/Runtime'
import { Events } from 'discord.js'

export default new DiscordEventHandler({
    name: Events.AutoModerationRuleCreate,
    description: 'Fired when an automoderation rule is created.',
    async call(rule) {
        const runtime = new Runtime(rule, this)
        const commands = this.commands.getType('automodRuleCreate')
        if (commands.length === 0) return;

        for (const command of commands) {
            await command.call(runtime);
        }
    }
})