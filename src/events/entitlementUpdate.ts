import { DiscordEventHandler } from '@core/extended/DiscordEventHandler'
import { Runtime } from '@structures/Runtime'
import { Events } from 'discord.js'

export default new DiscordEventHandler({
    name: Events.EntitlementUpdate,
    description: 'Fired when an entitlement is updated.',
    async call(oldEntitlement, newEntitlement) {
        const runtime = new Runtime(newEntitlement, this)
        const commands = this.commands.getType('entitlementUpdate')
        if (commands.length === 0) return;

        for (const command of commands) {
            runtime.setState({ entitlement: { old: oldEntitlement, new: newEntitlement } });
            await command.call(runtime);
        }
    }
})