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
    code: '@{console.log("hola bb")}'
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

        $c[Sending the message using embedded JS.]
        @{
            await runtime.send({
                content: \`I'm in \${$allChannelsCount[0]} channels!\`,
                components: runtime.container.components
            });
        
            runtime.container.reset();
        }
    `
})

client.login(process.env.TOKEN)