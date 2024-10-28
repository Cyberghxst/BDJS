const { KeyValueNode, LiteralNode } = require('../dist/classes/core/Nodes')
const { Transpiler, TranspiledCommand } = require('../dist')
const { Logger } = require('../dist/classes/core/Logger')

const transpiler = new Transpiler()
const command = new TranspiledCommand({
    name: /uwu/,
    type: 'prefixed',
    code: '$ping\n$userAvatar[$clientID;4096;jpeg;false]',
    // minify: false
}, transpiler)

console.log(command)

/* const keyvalue = new KeyValueNode([
    [new LiteralNode('username'), new LiteralNode('"Cyberghxst"')],
    [new LiteralNode('age'), new LiteralNode('22')],
    [new LiteralNode('favorite_language'), new LiteralNode('"TypeScript"')]
])

console.log(keyvalue.serialize()) */