import { DiscordEventHandler } from '@core/extended/DiscordEventHandler'
import { Runtime } from '@structures/Runtime'
import { Events } from 'discord.js'

export default new DiscordEventHandler({
    name: Events.EntitlementCreate,
    description: 'Fired when an entitlement is created.',
    async call(entitlement) {
        const runtime = new Runtime(entitlement, this)
        const commands = this.commands.getType('entitlementCreate')
        if (commands.length === 0) return;

        for (const command of commands) {
            await command.call(runtime);
        }
    }
})