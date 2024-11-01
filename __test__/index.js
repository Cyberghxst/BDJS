const { Transpiler } = require('../dist')

const transpiler = new Transpiler()
const output = transpiler.transpile('$if[$contains[$get[userDefinedMessage];xd]==true;$log[waos]]$elseif[$contains[$get[userDefinedMessage];xd]==false;$log[ok]]$else[$log[bye]]$try[$log[value]]$catch[$log[passfailed]]')

console.log(output)