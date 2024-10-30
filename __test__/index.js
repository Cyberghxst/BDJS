const { Transpiler } = require('../dist');

const transpiler = new Transpiler();
const output = transpiler.transpile(`
$guildLeave[$guildID;
    $log[$get[I left the guild. $env[guild;name]]]
;
    $log[Something went wrong when leaving the guild. $env[err;message]]
]    
`);

console.log(output);