"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Interpreter = Interpreter;
function Interpreter(ast, runtime) {
    for (const token of ast) {
        if (token.isFieldless()) {
            // const result = token.data?.run.call()
        }
    }
}
