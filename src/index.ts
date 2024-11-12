import { Lexer } from './classes/core/Lexer'
import { inspect } from 'util'

const debug = <T>(data: T, depth: number | null = null) => console.log(inspect(data, { colors: true, depth }));

const lexer = new Lexer(`
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

$setChannelVar[requester;$authorID]

$onlyIf[$voiceID!=;{newEmbed:{description:Você precisa conectar em uma call pra ouvir música.}{color:Orange}}]
$onlyIf[$message!=;{newEmbed:{description: Você está usando da forma errada! Use: \`B.play [nome da música]\`}{color:Orange}}]
$.globalCooldown[2s;{newEmbed:{description:Espere %time% para usar o comando novamente}{color:Orange}}]    
`)

const ast = lexer.toAST()
debug(ast)