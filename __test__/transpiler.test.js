const { KeyValueNode, LiteralNode } = require('../dist/classes/core/Nodes')
const { Transpiler, TranspiledCommand } = require('../dist')
const { Logger } = require('../dist/classes/core/Logger')

const transpiler = new Transpiler()
const command = new TranspiledCommand({
    name: /uwu/,
    type: 'prefixed',
    code: `
        $define[avatar]
        $let[avatar;$userAvatar[$clientID;4096;jpeg;false]]
        
        $if[$get[avatar]==undefined;
            $toString[44ikjnkn444]
        ]
        $elseif[$get[avatar]!=undefined;
            $toString[44ikjnkn444]
        ]
        $else[
            $let[avatar;byee]
        ]`,
    minify: false
}, transpiler)

console.log(command['data'].transpiled)

/* const keyvalue = new KeyValueNode([
    [new LiteralNode('username'), new LiteralNode('"Cyberghxst"')],
    [new LiteralNode('age'), new LiteralNode('22')],
    [new LiteralNode('favorite_language'), new LiteralNode('"TypeScript"')]
])

console.log(keyvalue.serialize()) */