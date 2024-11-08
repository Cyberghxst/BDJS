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
    code: `@{console.log(runtime.client.commands.cache.get("hola").code.toString())}`
},{
    name: 'test',
    type: 'prefixed',
    code: `
        $c[Saving the user name.]
        $let[username;@{runtime.user.username}]

        $c[Saving the amount of channels.]
        $let[channelCount;$allChannelsCount]

        $c[Show the client as typing.]
        $if[$channelType[$channelID]==0;
            $sendTyping[$channelID]
        ]

        $c[Attaching a select menu.]
        $addSelectMenu[role;roles_menu;Please select a role!;false;1;1]

        $c[Attaching a button to the container.]
        $addButton[bdjs_button;Primary;Push me!;;false;1]
        $addButton[bdjs_button2;Secondary;Once again?;;false;1]
        $addButton[bdjs_button3;Danger;DO NOT PRESS;;true;1]
        $addButton[bdjs_button4;Success;PASS;;true;1]

        $c[Sending a message using the instruction.]
        $sendMessage[$channelID;
            $title[Mibombo]
            okkkkkkk
        ;mibombo]
        $log[$get[mibombo]]
    `
},{
    name: 'hola',
    type: 'prefixed',
    code: `
        $onlyIf[$args[0]==hola;
            $sendMessage[$channelID;Debes saludar.]
        ]

        $sendMessage[$channelID;hallo! c:]
    `
},{
    name: 'adios',
    type: 'prefixed',
    async code(runtime) {
        await runtime.send('adiós.')
    }
})

client.login(process.env.TOKEN)