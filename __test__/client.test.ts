import { Runtime } from "../src/classes/structures/Runtime"
import { Client, Events } from "discord.js"

const client = new Client({
    intents: [
        "Guilds",
        "GuildMessages",
        "MessageContent"
    ]
}) as Client<true>

client.on(Events.MessageCreate, async message => {
    const ctx = new Runtime(message, client)
    if (ctx.user!.bot) return;

    ctx.isSendable() && ctx.channel.send(ctx.user!.username)
    ctx.inGuild() && ctx.guild.members
})

client.on(Events.InteractionCreate, async i => {
    const ctx = new Runtime(i, client)
    if (ctx.user!.bot) return;

    ctx.isSendable() && ctx.channel.send(ctx.user!.username)
    ctx.inGuild() && ctx.guild.members
})

client.on(Events.ChannelCreate, async channel => {
    const ctx = new Runtime(channel, client)
    if (ctx.user!.bot) return;

    ctx.isSendable() && ctx.channel.send(ctx.user!.username)
    ctx.inGuild() && ctx.guild.members
})

client.login()