const { Lexer } = require('../dist/classes/core/Lexer')
const assert = require('node:assert/strict')
const test = require('node:test')

const sampleCode = `
$if[$playerStatus==idle]
$description[Procurando...]
$color[Orange]
$else
$if[$playerStatus==playing]
$description[Sua música foi adicionada na fila.]
$color[Orange]
$endif
$endif
$playTrack[$message;spotify]
$if[$hasPlayer==false]
$joinVC
$endif
`;

const sampleCode2 = `
$setChannelVar[requester;$authorID]
$onlyIf[$voiceID!=;{newEmbed:{description:Você precisa conectar em uma call pra ouvir música.}{color:Orange}}]
$onlyIf[$message!=;{newEmbed:{description: Você está usando da forma errada! Use: \`B.play [nome da música]\`}{color:Orange}}]
$globalCooldown[2s;{newEmbed:{description:Espere %time% para usar o comando novamente}{color:Orange}}]

$title[1;:1000174283:> Informações do usuário]
$description[1;
> :1000174281: **Usuário**: \`$username[$get[a]]\` (\`$get[a]\`)
> :1000174281: **Criação da conta**: <t:$truncate[$divide[$creationDate[$get[a];ms];1000]]:R>

$if[$memberExists[$get[a]]==true]
> :1000174281: **Data de entrada no servidor**: <t:$truncate[$divide[$memberJoinDate[$get[a];$guildID;ms];1000]]:R>
> :1000174281: **Booster?**: $replaceText[$replaceText[$isBoosting[$get[a];$guildID];true;Sim;1];false;Não;1]
$endif

> :1000174281: **Tipo de conta?**: $replaceText[$replaceText[$isBot[$get[a]];true;Bot;1];false;Humano;1]]
$author[1;@$username;$authorAvatar]

$if[$memberExists[$get[a]]==true]
$color[$getRoleColor[$userHighestRole[$get[a];$guildID]]]
$else
$color[4b0082]
$endif

$title[2; Informações extras]
$description[2;
> :1000174281: **Status**: $replaceText[$replaceText[$replaceText[$replaceText[$userStatus[$get[a]];online;:1000174286:;1];invisible;:1000174287:;1];dnd;⛔;1];idle;🌙;1]
> :1000174281: **Maior cargo**: $userHighestRole[$get[a];$guildID;mention]
> :1000174281: **Avatar Costumizado?**: $replaceText[$replaceText[$checkCondition[$userDefaultAvatar[$get[a]]==$userAvatar[$get[a]]];true;Sim, esse usuário usa um avatar padrão;1];false;Não, esse usuário possui um avatar customizado;1]]

$footer[Requisitado por $username;$authorAvatar]
$addTimestamp
$let[a;$findUser[$message;true]]
`;

test.describe('should create a new instance of Lexer', () => {
    const lexer = new Lexer(sampleCode)
    assert.equal(lexer instanceof Lexer, true)
})

test.describe('should create an AST', () => {
    const lexer = new Lexer(sampleCode)

    const ast = lexer.toAST()

    assert.ok(ast)
})

test.describe('should have 1 main function', () => {
    const lexer = new Lexer(sampleCode)

    const ast = lexer.toAST()

    assert.equal(ast.length, 1)
})

test.describe('main function should have 13 children', () => {
    const lexer = new Lexer(sampleCode)

    const ast = lexer.toAST()

    assert.equal(ast[0].children.length, 13)
})