"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Interpreter = Interpreter;
const Lexer_1 = require("./Lexer");
const Errors_1 = require("./Errors");
async function Interpreter(ast, runtime) {
    if (typeof ast === 'undefined')
        return '';
    if (!Array.isArray(ast))
        ast = [ast];
    if (`$${ast[0]?.name}` === Lexer_1.mainInstruction)
        ast = ast[0].children;
    let output = '';
    for (const token of ast) {
        let fields = token.isFieldless() ? [] : token.fields.map((field) => field.value);
        for (const child of token.children) {
            const result = await Interpreter(child, runtime) ?? '';
            fields[child.from].replace(token.toString(), result);
        }
        const instruction = new Lexer_1.CompiledInstruction(token, runtime);
        const result = await instruction.call(fields);
        if (result.isAnyError()) {
            throw new Errors_1.ExecutionError(token, result.content);
        }
        else if (result.isReturnKeyword()) {
            return result.content;
        }
        output += result.content;
    }
    return output;
}
