const { DiscordClient } = require('../dist')

const client = new DiscordClient({
    events: [
        'messageCreate',
        'ready'
    ],
    intents: [
        'Guilds',
        'GuildMessages',
        'MessageContent'
    ],
    prefixes: {
        advancedOptions: {
            transpileValues: false,
            transpileIndexes: []
        },
        values: ['.'],
        mentionAsPrefix: true
    }
})

client.addCommand({
    name: 'test',
    type: 'prefixed',
    code: `
        $c[Saving the user name.]
        $let[username;@{runtime.user.username}]

        $c[Attaching a button to the container.]
        $addButton[bdjs_button;Primary;Push me!]

        $c[Sending the message using embedded JS.]
        @{runtime.send({
            content: runtime.variables.get('username'),
            components: runtime.components
        })}
    `
})

client.login(process.env.TOKEN)