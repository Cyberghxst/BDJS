const { loadInstructions, Transpiler } = require('../dist')

const transpiler = new Transpiler()
const code = '$ping\n$ctx.client.transpiler.transpile*[$ping]'
const transpilation = transpiler.transpile(code)

console.log(transpilation)