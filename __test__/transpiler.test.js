const { loadInstructions, Transpiler } = require('../dist')

const transpiler = new Transpiler()
const code = '$ping'
const transpilation = transpiler.transpile(code)

console.log(transpilation)