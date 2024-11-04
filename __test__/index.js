const { Transpiler } = require('../dist')

const transpiler = new Transpiler()
const output = transpiler.transpile(`$title[Mi papá es $guildName y él me mima.]\n$footer[Ponwaos;$userAvatar]\n@{let value = "ok";console.log(value);}\n$author[$guildID;$userAvatar[$authorID]]\n\n@{value = "adios";\n\nconsole.log(value, "hola");}`)

console.log(output)