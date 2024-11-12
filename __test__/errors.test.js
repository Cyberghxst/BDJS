const { InvalidInstructionError } = require('../dist/classes/core/Errors')
const assert = require('node:assert/strict')
const test = require('node:test')
const { InstructionToken } = require('../dist/classes/core/Lexer')

test.describe('should throw an invalid instruction error', () => {
    const token = new InstructionToken()
    token.name = 'test'
    token.setClosed()
    token.setFieldless()
    token.bounds = [12, 16]
    token.lines = [1]
    token.path = ['$let', '$toLowerCase']

    assert.throws(() => {
        throw new InvalidInstructionError(token)
    })

    throw new InvalidInstructionError(token)
})