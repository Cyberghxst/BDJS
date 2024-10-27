const { Transpiler, TranspiledCommand } = require('../dist')
const { Logger } = require('../dist/classes/core/Logger')

const transpiler = new Transpiler()
const command = new TranspiledCommand({
    name: /uwu/,
    type: 'prefixed',
    code: '$ping\n$runtime.client.ws.ping*'
}, transpiler)