const { Transpiler } = require('../dist')

const transpiler = new Transpiler()
const output = transpiler.transpile('$contains[$get[userDefinedMessage];xd]')

console.log(output)