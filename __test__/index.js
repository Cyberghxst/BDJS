const { Transpiler } = require('../dist')

const transpiler = new Transpiler()
const output = transpiler.transpile('$guildName[$guildID]\n$guildName\n$guildID[$guildName]\n$guildID')

console.log(output)