const { Transpiler } = require('../dist')

const transpiler = new Transpiler()
const output = transpiler.transpile(`$addSelectMenu[string;ny]`)

console.log(output)