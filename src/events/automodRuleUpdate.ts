import { DiscordEventHandler } from '@core/extended/DiscordEventHandler'
import { Runtime } from '@structures/Runtime'
import { Events } from 'discord.js'

export default new DiscordEventHandler({
    name: Events.AutoModerationRuleUpdate,
    description: 'Fired when an automoderation rule is updated.',
    async call(oldRule, newRule) {
        const runtime = new Runtime(newRule, this)
        const commands = this.commands.getType('automodRuleUpdate')
        if (commands.length === 0) return;

        for (const command of commands) {
            runtime.setState({ automod: { old: oldRule, new: newRule } });
            await command.call(runtime);
        }
    }
})