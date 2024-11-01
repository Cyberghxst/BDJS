const { Transpiler } = require('../dist')

const transpiler = new Transpiler()
const output = transpiler.transpile('$title[Mi papá es $guildName y él me mima.]\n$footer[Ponwaos;$userAvatar]\n$author[$guildID;$userAvatar[$authorID]]')

console.log(output)