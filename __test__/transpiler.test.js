const { DiscordClient } = require('../dist')
const { config } = require('dotenv')

config()
const client = new DiscordClient({
    events: [
        'messageCreate'
    ],
    intents: [
        'Guilds',
        'GuildMessages',
        'MessageContent'
    ],
    prefixes: {
        mentionAsPrefix: false,
        values: [
            'uwu',
            'nice',
            'xd',
            '$clientName',
            '.'
        ],
        advancedOptions: {
            transpileValues: true,
            transpileIndexes: [3]
        }
    }
})

client.addCommand({
    name: 'ping',
    type: 'prefixed',
    code: '$let[mommy;uwu]\n$log[$get[mommy]]'
})

client.addCommand({
    name: 'ban',
    type: 'prefixed',
    code: `
        $let[targetId;$clientID]
        $ban[$guildID;$get[targetId];60000;Porque si]
        $log[Miembro bananeado.]
    `
})

console.log(client.commands['cache'])

client.login(process.env.TOKEN)