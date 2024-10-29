const { DiscordClient } = require('../dist')
const { config } = require('dotenv')

config()
const client = new DiscordClient({
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
            '$userAvatar[$clientID]'
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
    async code(runtime) {
        console.log(runtime.user.username)
        runtime.globals.set('message', 'wazzzzuuuuup')
    }
}, {
    name: 'pong',
    type: 'prefixed',
    code: '$log[$getGlobalValue[message]]'
})

client.login(process.env.TOKEN)