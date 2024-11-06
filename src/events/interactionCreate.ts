import { DiscordEventHandler } from '@core/extended/DiscordEventHandler'
import { DiscordClient } from '@structures/DiscordClient'
import { CommandTypes } from '@structures/Command'
import { Runtime } from '@structures/Runtime'
import { Events } from 'discord.js'

async function runInteractionType(this: DiscordClient, commandType: CommandTypes, runtime: Runtime) {
    const commands = this.commands.getType(commandType)
    if (commands.length === 0) return;

    for (const command of commands) {
        await command.call(runtime);
    }
}

export default new DiscordEventHandler({
    name: Events.InteractionCreate,
    description: 'Fired when an interaction is created.',
    async call(interaction) {
        const runtime = new Runtime(interaction, this)
        
        if (interaction.isAnySelectMenu()) {
            await runInteractionType.call(this, 'selectMenuInteraction', runtime);
        } else if (interaction.isAutocomplete()) {
            await runInteractionType.call(this, 'autocompleteInteraction', runtime);
        } else if (interaction.isButton()) {
            await runInteractionType.call(this, 'buttonInteraction', runtime);
        } else if (interaction.isChatInputCommand()) {
            await runInteractionType.call(this, 'commandInteraction', runtime);
        } else if (interaction.isModalSubmit()) {
            await runInteractionType.call(this, 'modalInteraction', runtime);
        } else if (interaction.isMessageContextMenuCommand()) {
            await runInteractionType.call(this, 'messageContextMenuInteraction', runtime);
        } else if (interaction.isUserContextMenuCommand()) {
            await runInteractionType.call(this, 'userContextMenuInteraction', runtime);
        }

        await runInteractionType.call(this, 'anyInteraction', runtime);
    }
})