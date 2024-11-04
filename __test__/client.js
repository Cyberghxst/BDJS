const { DiscordClient } = require('../dist')

require('dotenv').config()
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
    type: 'ready',
    code: '@{console.log(runtime.client.commands.cache.get("test"))}'
},{
    name: 'test',
    type: 'prefixed',
    code: `
        $c[Saving the user name.]
        $let[username;@{runtime.user.username}]

        $c[Attaching a select menu.]
        $addSelectMenu[role;roles_menu;Please select a role!;false;1;1]

        $c[Attaching a button to the container.]
        $addButton[bdjs_button;Primary;Push me!;;false;1]
        $addButton[bdjs_button2;Secondary;Once again?;;false;1]
        $addButton[bdjs_button3;Danger;DO NOT PRESS;;true;1]
        $addButton[bdjs_button4;Success;PASS;;true;1]

        $c[Sending the message using embedded JS.]
        @{runtime.send({
            content: runtime.variables.get('username'),
            components: runtime.container.components
        })}
    `
})

client.login(process.env.TOKEN)