const { InstructionManager } = require('../dist/classes/managers/InstructionManager')
const { Interpreter } = require('../dist/classes/core/Interpreter')
const { Runtime } = require('../dist/classes/structures/Runtime')
const { Lexer } = require('../dist/classes/core/Lexer')
const assert = require('node:assert/strict')
const test = require('node:test')

test.describe('should log "hallo world" and return "ok"', async () => {
    InstructionManager.add(require('../dist/instructions/log').default)
    InstructionManager.add(require('../dist/instructions/return').default)
    const ast = new Lexer('$log[hallo world]\n$return[ok]\n$log[hallo world]').toAST()

    Interpreter(ast, new Runtime({}, null)).then((result) => {
        assert.equal(result, 'ok')
    })
})