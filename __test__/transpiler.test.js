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
            '$userAvatar[$clientID]',
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

client.login(process.env.TOKEN)